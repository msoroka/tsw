/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const uuidv1 = require('uuid/v1');

let games = new Map();

let generateGame = (size, colors) => {
    let board = [];

    for(let i = 0; i < size; i++) {
        board[i] = Math.floor(Math.random() * colors) + 1;
    }

    return board;
};

exports.new = (req, res) => {
    let game = uuidv1();
    let size = req.body.size;
    let colors = req.body.colors;
    let steps = 0;

    if(req.body.steps) {
        steps = req.body.steps;
    } else {
        steps = "inf";
    }

    let gameSettings = {
        "game": game,
        "size": size,
        "colors": colors,
        "steps": steps,
    };

    games.set(game, {
        "settings": gameSettings,
        "status": false,
        "moves": {},
        "board": generateGame(size, colors),
    });

    res.status(201).send(gameSettings);
};

exports.move = (req, res) => {
    let game = req.body.game;
    let move = req.body.move;

    if(!games.has(game)) {
        res.status(404).send({
           "massage": "Game doesn't exsist", 
        });
    }

    let moves =  Array.from(games.get(game).moves);
    moves.push(move);

    games.set(game, {
        "settings": games.get(game).settings,
        "status": games.get(game).status,
        "moves": moves,
        "board": games.get(game).board,
    });

    res.status(200).send({
        "game": game,
        "result": {
            "black": "",
            "white": "",
        }
    });
};

exports.status = (req, res) => {
    let game = req.body.game;

    if(!games.has(game)) {
        res.status(404).send({
           "massage": "Game doesn't exsist", 
        });
    }

    res.status(200).send({
        "game": game,
        "status": games.get(game).status,
        "moves": games.get(game).moves
    });
};