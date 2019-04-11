/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

var express = require("express"),
    app = express(),
    routes = require('./route/index'),
    bodyParser = require("body-parser");

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

app.use('/', routes);

app.listen(3000, function () {
    console.log("Mastermind is running on port " + PORT);
});