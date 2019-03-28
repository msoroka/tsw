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

const poKolei = (fun1, fun2, callback, value) => {
    fun1(value, (wynik) => {
        fun2(wynik, (wynik) => {
            callback(wynik);
        });
    });
};

poKolei(fun1, fun2, callback, 2);