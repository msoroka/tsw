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

let callback = (value) => {
    console.log(value);
};

const razem = (fun1, fun2, callback, value) => {
    let wyniki = [];
    let length = arguments.length - 3;

    fun1(value, (wynik) => {
        wyniki.push(wynik);
        if (wyniki.length == length) callback(wyniki);
    });
    fun2(value, (wynik) => {
        wyniki.push(wynik);
        if (wyniki.length == length) callback(wyniki);
    });
};

for (let index = 0; index < 10; index++) {
    razem(fun1, fun2, callback, 2);
}