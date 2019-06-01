var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');

var properties = require('./config/properties');
var db = require('./config/database');
var judgesRoutes = require('./api/judges/judges.route');
var classesRoutes = require('./api/classes/classes.route');
var horsesRoutes = require('./api/horses/horses.route');
var app = express();

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended: true});
var router = express.Router();

db();

app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});


app.use('/', router);
judgesRoutes(router);
classesRoutes(router);
horsesRoutes(router);

app.listen(properties.PORT, (req, res) => {
    console.log(`Server działa na porcie ${properties.PORT}`);
});
