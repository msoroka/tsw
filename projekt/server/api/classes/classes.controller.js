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

        Classes.find({}, function (err, classes) {
            classes.forEach(val => {
                if (val.numer >= req.body.numer) {
                    val.numer = val.numer + 1;
                    Classes.update({_id: val._id}, val, function (err, val) {
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
    console.log(req.session.passport);
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

exports.updateClass = function (req, res, next) {
    if (req.isAuthenticated()) {
        var cl = {
            numer: req.body.numer,
            kat: req.body.kat,
            czempionat: req.body.czempionat,
            komisja: req.body.komisja
        };

        Classes.findOne({_id: req.params.id}, function (err, cl) {
            Classes.find({}, null, {sort: {numer: 1}}, function (err, classes) {
                if (cl.numer !== req.body.numer) {
                    let isChanged = false;
                    classes.forEach(val => {
                        if (val._id.toString() !== req.params.id) {
                            if (isChanged) {
                                Horses.find({klasa: val.numer}, function (err, horses) {
                                    horses.forEach(h => {
                                        h.klasa = val.numer + 1;
                                        Horses.update({_id: h._id}, h, function (err, h) {
                                        });
                                    });

                                    return horses;
                                }).then(function () {
                                    val.numer = val.numer + 1;
                                    Classes.update({_id: val._id}, val, function (err, val) {
                                    });
                                });
                            }
                            if (val.numer == req.body.numer) {
                                isChanged = true;
                                Horses.find({klasa: val.numer}, function (err, horses) {
                                    horses.forEach(h => {
                                        h.klasa = val.numer + 1;
                                        Horses.update({_id: h._id}, h, function (err, h) {
                                        });
                                    })

                                    return horses;
                                }).then(function () {
                                    val.numer = val.numer + 1;
                                    Classes.update({_id: val._id}, val, function (err, val) {
                                    })
                                });
                            }
                        }
                    });
                }

                return classes;
            }).then(function () {
                if (cl.numer !== req.body.numer) {
                    Horses.find({klasa: cl.numer}, function (err, horses) {
                        horses.forEach(h => {
                            h.klasa = req.body.numer;
                            Horses.update({_id: h._id}, h, function (err, h) {
                            });
                        })
                    });
                }
            })
        }).then(function () {
            Classes.update({_id: req.params.id}, cl, function (err, cl) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                res.json({
                    message: "Class updated successfully"
                })
            });
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
