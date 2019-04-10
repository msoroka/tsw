/* jshint strict: global, esversion: 6, devel: true */
'use strict';

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

let kod = toMap([1, 3, 3, 2, 2]);
let ruch = toMap([1, 3, 2, 3, 2]);

console.log("White: " + white(kod, ruch));
console.log("Black: " + black(kod, ruch));