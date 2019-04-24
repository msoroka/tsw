/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

var express = require("express"),
    app = express(),
    routes = require('./route/index'),
    bodyParser = require("body-parser"),
    lessMiddleware = require('less-middleware');

const PORT = process.env.PORT || 3000;

app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.listen(3000, function () {
    console.log("Mastermind is running on port " + PORT);
});