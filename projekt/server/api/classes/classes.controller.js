var Classes = require('./classes.dao');
var Horses = require('../horses/horses.dao');

exports.createClass = function (req, res, next) {
    if (req.isAuthenticated()) {
        var cl = {
            numer: req.body.numer,
            kat: req.body.kat,
            czempionat: req.body.czempionat,
            komisja: req.body.komisja
        };

        Classes.find({}, null, {sort: {numer: 1}}, function (err, classes) {
            classes.forEach(val => {
                if (val.numer >= req.body.numer) {
                    Horses.find({klasa: val.numer}, function (err, horses) {
                        horses.forEach(horse => {
                            horse.klasa = val.numer + 1;
                            Horses.update({_id: horse._id}, horse, function (err, horse) {
                            });
                        });

                        return horses;
                    }).then(function () {
                        val.numer = val.numer + 1;
                        Classes.update({_id: val._id}, val, function (err, val) {
                        });

                        return val;
                    });
                }
            });

            return classes;
        }).then(function () {
            Classes.create(cl, function (err, cl) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                res.send(cl);
            });
        });
    }
};

exports.getClass = function (req, res, next) {
    Classes.get({_id: req.params.id}, function (err, cl) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.send(cl);
    })
};

exports.getClasses = function (req, res, next) {
    Classes.find({}, null, {sort: {numer: 1}}, function (err, classes) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.send(classes);
    });
};

let updateRestClass = (req, newCl) => {
    Classes.findOne({_id: req.params.id}, function (err, cl) {
        console.log('cl', cl);
        return Classes.find({}, null, {sort: {numer: 1}}, function (err, classes) {
            if (cl.numer != newCl.numer) {
                Classes.distinct('numer', null, function (err, classesNumber) {
                    return classes.forEach(val => {
                        console.log(parseInt(val.numer) >= parseInt(newCl.numer), classesNumber.includes(parseInt(newCl.numer)));
                        if (parseInt(val.numer) >= parseInt(newCl.numer) && classesNumber.includes(parseInt(newCl.numer))
                            && !val._id.equals(cl._id)) {
                            console.log('val', val);
                            val.numer = parseInt(val.numer + 1);
                            console.log('val2', val);
                            Classes.update({_id: val._id}, val, function (err, cl) {
                                 Horses.find({klasa: val.numer - 1}, function (err, horses) {
                                    console.log('horses', horses);
                                    horses.forEach(horse => {
                                        horse.klasa = val.numer;
                                        Horses.update({_id: horse._id}, horse, function (err, horse) {
                                        });
                                        console.log('horse_up', horse);
                                    });

                                });
                            });
                        }
                    });
                }).then(function () {
                    return Horses.find({klasa: cl.numer}, function (err, horses) {
                        if (cl.numer != newCl.numer) {
                            horses.forEach(horse => {
                                horse.klasa = newCl.numer;
                                console.log('newhorse', horse);
                                Horses.update({_id: horse._id}, horse, function (err, horse) {
                                });
                            });
                        }
                    })
                }).then(function () {
                    console.log(newCl);
                    return Classes.update({_id: req.params.id}, newCl, function (err, cl) {
                        });
                });;
            }
        });
    }).then(() => {
        // console.log(newCl);
        // return Classes.update({_id: req.params.id}, newCl, function (err, cl) {
        // });
    });
};

exports.updateClass = function (req, res, next) {
    if (req.isAuthenticated()) {
        var newCl = {
            numer: req.body.numer,
            kat: req.body.kat,
            czempionat: req.body.czempionat,
            komisja: req.body.komisja
        };

        updateRestClass(req, newCl);
        res.json({
            message: "Class updated successfully"
        });
    }
};

exports.removeClass = function (req, res, next) {
    if (req.isAuthenticated()) {
        Classes.delete({_id: req.params.id}, function (err, cl) {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                message: "Class deleted successfully"
            })
        })
    }
};
