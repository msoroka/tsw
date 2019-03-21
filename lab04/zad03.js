/* jshint strict: global, esversion: 6, devel: true */
'use strict';

let szablon =
    '<table border="{border}">' +
    '  <tr><td>{first}</td><td>{last}</td></tr>' +
    '</table>';

let dane = {
    first: "Jan",
    last: "Kowalski",
    pesel: "97042176329"
};

String.prototype.podstaw = function (dane) {
    return this.replace(/\{([a-zA-Z0-9]+)\}/g, (match, p1) => {
        if (dane.hasOwnProperty(p1)) {
            return dane[p1];
        }

        return match;
    });
};

console.log(szablon.podstaw(dane));