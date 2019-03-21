/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const toMap = (array) => {
    let m = new Map();
    array.forEach((value, key) => {
        if (!m.has(value)) {
            m.set(value, new Set());
        }

        m.get(value).add(key);
    });

    return m;
};

const ocena = (kod, ruch) => {
    ruch.forEach((value, key) => {
        if(kod.has(key)) {
            console.log(kod.get(key));
            console.log(ruch.get(key));
        }
    });
};

let kod = toMap([1, 3, 3, 2, 2]);
let ruch = toMap([2, 2, 3, 9, 2]);

console.log(kod);
console.log(ruch);

console.log(ocena(kod, ruch));