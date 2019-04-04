/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const uuidv1 = require('uuid/v1');

exports.new = (req, res) => {
    let game = uuidv1();
    let size = req.body.size;
    let colors = req.body.colors;
    let steps = req.body.steps;

    res.status(201).send({
        "game": game,
        "size": size,
        "colors": colors,
        "steps": steps,
    });
};

exports.move = (req, res) => {
    let game = req.body.game;
    let move = req.body.move;
};

exports.status = (req, res) => {
    let game = req.body.game;
};