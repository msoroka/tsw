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
    let array = Array.from(arguments);
    array.shift();

    array.forEach((value, key) => {
        if(typeof value === f.typeConstr[key]) {
            args.push(value);
        } else {
            throw({ typerr: "Argument " + (key + 2) + " wasn't typeof " + f.typeConstr[key] + "."});
        }
    });

    return f.apply(this, args);
};

try {
    console.log(appFun(myFun, 12, 15));
} catch (e) {
    console.log(e.typerr);
}

try {
    console.log(appFun(myFun, 12, '15'));
} catch (e) {
    console.log(e.typerr);
}