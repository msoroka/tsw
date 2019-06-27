var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cors = require('cors');

const sessionStore = new RedisStore({
    host: 'localhost',
    port: 6379,
    client: require('redis').createClient(),
    disableTTL: true
});

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var socketIo = require('socket.io');
var passportSocketIo = require('passport.socketio');

var cookieParser = require('cookie-parser');
var properties = require('./config/properties');
var db = require('./config/database');
var judgesRoutes = require('./api/judges/judges.route');
var classesRoutes = require('./api/classes/classes.route');
var horsesRoutes = require('./api/horses/horses.route');
var app = express();
var router = express.Router();

db();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        if ((username === 'admin') && (password === 'tajne')) {
            return done(null, {
                username: username,
                password: password
            });
        } else {
            return done(null, false);
        }
    }
));

app.use(log);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        return callback(null, true);
    },
}));

var sessionSecret = 'Wielki$ekret44';
var sessionKey = 'express.sid';
app.use(session({
    key: sessionKey,
    secret: sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.status(200).send(req.isAuthenticated());
    }
);
app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send(req.isAuthenticated());
});

var Horses = require('./api/horses/horses.dao');
var Classes = require('./api/classes/classes.dao');

var getSumPoints = (horse) => {
    var horseTyp = 0;
    var horseGlowa = 0;
    var horseKloda = 0;
    var horseNogi = 0;
    var horseRuch = 0;
    var horseSuma = 0;
    Array.from(horse.wynik.noty).forEach(hw => {
        horseTyp += Number(hw.typ);
        horseGlowa += Number(hw.glowa);
        horseKloda += Number(hw.kloda);
        horseNogi += Number(hw.nogi);
        horseRuch += Number(hw.ruch);
    });
    horseSuma = horseTyp + horseGlowa + horseKloda + horseNogi + horseRuch;

    return horseSuma;
};

var getTypeSumPoints = (horse) => {
    var horseTyp = 0;
    Array.from(horse.wynik.noty).forEach(hw => {
        horseTyp += Number(hw.typ);
    });

    return horseTyp;
};

var getMoveSumPoints = (horse) => {
    var horseRuch = 0;
    Array.from(horse.wynik.noty).forEach(hw => {
        horseRuch += Number(hw.ruch);
    });

    return horseRuch;
};

var compare = (a, b) => {
    if (a.klasa === b.klasa) {
        if (getSumPoints(a) > getSumPoints(b)) {
            return -1;
        } else if (getSumPoints(a) < getSumPoints(b)) {
            return 1;
        } else {
            if (getTypeSumPoints(a) > getTypeSumPoints(b)) {
                return -1;
            } else if (getTypeSumPoints(a) < getTypeSumPoints(b)) {
                return 1;
            } else {
                if (getMoveSumPoints(a) > getMoveSumPoints(b)) {
                    return -1;
                } else if (getMoveSumPoints(a) < getMoveSumPoints(b)) {
                    return 1;
                } else {
                    if (a.wynik.rozjemca < b.wynik.rozjemca) {
                        return -1;
                    } else if (a.wynik.rozjemca > b.wynik.rozjemca) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        }
    }
};

var server = require('http').createServer(app);

var sio = socketIo.listen(server);
var onAuthorizeSuccess = (data, accept) => {
    accept();
};
var onAuthorizeFail = (data, message, error, accept) => {
    accept();
};
sio.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: sessionKey,
    secret: sessionSecret,
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
}));

sio.sockets.on('connection', function (socket) {
    socket.on('ranking', function (data) {
        Horses.find({}, null, {sort: {klasa: 1}}, function (err, horses) {
            sio.emit('ranking', horses.sort(compare));
        });
    });
    socket.on('klasa', function (data) {
        if (data) {
            Classes.findOne({_id: data.klasa._id}, function (err, cl) {
                cl.status = data.status;
                Classes.update({_id: cl._id}, cl, function (err, cl) {
                });
            });
        }

        Classes.find({}, null, {sort: {numer: 1}}, function (err, classes) {
            if (data) {
                classes.forEach(val => {
                    if (val._id == data.klasa._id) {
                        val.status = data.status;
                    }
                })
            }
            sio.emit('klasa', classes);
        });
    });
    socket.emit('AUTHORIZED', socket.request.user);
});

app.use('/', router);
judgesRoutes(router);
classesRoutes(router);
horsesRoutes(router);

server.listen(properties.PORT, () => {
    console.log(`Serwer ${properties.PORT}`);
});
