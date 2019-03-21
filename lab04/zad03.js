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
    return this.replace(/{[\w]+}/g, (match) => {
        let arg = match.substr(1, match.length - 2);
        return dane.hasOwnProperty(arg) ? dane[arg] : match;
    });
};

console.log(szablon.podstaw(dane));