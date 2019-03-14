/* jshint strict: global, esversion: 6, devel: true */
'use strict';


String.prototype.nbsp = function() {
    return this.replace(/\s[aiouwz]\s/g, function(match) {
        return match.substring(0, match.length - 1) + '&nbsp;';
	});
};

let tekst = 'Ala i As poszli w las\nw czasie zajęć.';

console.log(tekst.nbsp());