/* jshint strict: global, esversion: 6, devel: true */
'use strict';

let defFun = function(fun, types) {
    fun.typeConstr = types;
    return fun;
};

const myFun = defFun((a, b) => a + b, ['number', 'number']);

let appFun = function(f) {
    if(f.typeConstr === 'undefined') {
        throw({ typerr: "typeConstr is undefined"});
    }

    let args = [];
    Array.from(arguments).forEach((value, key) => {
        if(typeof value === f.typeConstr[key - 1]) {
            args.push(value);
        }
    });

    return f.apply(this, args);
};

try {
    console.log(appFun(myFun, 12, 15));
} catch (e) {
    console.log(e.typerr);
}