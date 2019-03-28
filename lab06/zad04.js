/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

let fun1 = (value, callback) => {
    setTimeout(() => {
        callback(value * value);
    }, Math.random() * 1000);
};

let fun2 = (value, callback) => {
    setTimeout(() => {
        callback(value * value * value);
    }, Math.random() * 1000);
};

let fun3 = (value, callback) => {
    setTimeout(() => {
        callback(value * value * 10);
    }, Math.random() * 1000);
};

let callback = (value) => {
    console.log(value);
};

const razem = (razemTab, value) => {
    let wyniki = [];

    for (let index = 0; index < razemTab.length - 1; index++) {
        razemTab[index](value, (wynik) => {
            wyniki.push(wynik);
            if (wyniki.length == razemTab.length - 1) callback(wyniki);
        });
    }
};

razem([fun1, fun2, fun3, callback], 2);
