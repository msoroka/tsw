/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const uuidv1 = require('uuid/v1');

let games = new Map();

let generateGame = (size, colors) => {
    let board = [];

    for (let i = 0; i < size; i++) {
        board[i] = Math.floor(Math.random() * colors) + 1;
    }

    return board;
};


let toMap = (array) => {
    let m = new Map();
    array.forEach((value, key) => {
        if (!m.has(value)) {
            m.set(value, new Set());
        }

        m.get(value).add(key);
    });

    return m;
};

let white = (board, move) => {
    let points = 0;

    move.forEach((value, key) => {
        if (board.has(key)) {
            points += Math.min(board.get(key).size, move.get(key).size);
        }
    });

    return points - black(board, move);
};

let black = (board, move) => {
    let points = 0;

    move.forEach((value, key) => {
        if (board.has(key)) {
            points += (Array.from(value).filter(v => Array.from(board.get(key)).includes(v))).length;
        }
    });

    return points;
};


exports.new = (req, res) => {
    let game = uuidv1();
    let size = req.body.size;
    let colors = req.body.colors;
    let steps = 0;

    if (req.body.steps) {
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
        "board": generateGame(size, colors),
        "moves": [],
    });

    res.status(201).send(gameSettings);
};

exports.move = (req, res) => {
    let game = req.body.game;
    let move = req.body.move;

    if (!games.has(game)) {
        res.status(404).send({
            "massage": "Game doesn't exsist.",
        });
    }

    if (games.get(game).settings.steps == 0) {
        res.status(202).send({
            "massage": "No steps left.",
        });
    }

    if (games.get(game).status == true) {
        res.status(200).send({
            "massage": "Game finished successfully..",
        });
    }

    let moves = games.get(game).moves;
    moves.push(move);

    let whitePoints = white(toMap(games.get(game).board), toMap(move));
    let blackPoints = black(toMap(games.get(game).board), toMap(move));
    let steps = games.get(game).settings.steps;

    if (steps != 'inf') {
        steps = parseInt(steps) - 1;
    }

    games.set(game, {
        "settings": {
            "game": games.get(game).settings.game,
            "size": games.get(game).settings.size,
            "colors": games.get(game).settings.colors,
            "steps": steps,
        },
        "status": blackPoints == games.get(game).board.length ? true : false,
        "board": games.get(game).board,
        "moves": moves,
    });

    res.status(200).send({
        "game": game,
        "result": {
            "black": blackPoints,
            "white": whitePoints,
        }
    });
};

exports.status = (req, res) => {
    let game = req.body.game;

    if (!games.has(game)) {
        res.status(404).send({
            "massage": "Game doesn't exsist",
        });
    }

    res.status(200).send({
        "game": game,
        "status": games.get(game).status,
        "steps": games.get(game).settings.steps,
        "moves": games.get(game).moves
    });
};