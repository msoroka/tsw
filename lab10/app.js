let express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGODB_URI || "mongodb://localhost/chat";

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

const DB = mongoose.connection;
DB.on('connected', () => {
    console.log('Connected to mongodb');
});

let Message = mongoose.model('Message', {
    room: String,
    username: String,
    message: String,
});

server.listen(PORT, () => {
    console.log(`Chat is running on port ${PORT}`);
});

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        io.emit('message', msg);
        let message = new Message(msg);
        message.save((err) => {
            console.log(err);
        });
    });
});

app.get('/messages', function(_req, res, _next) {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});


module.exports = app;
