var Horses = require('./horses.dao');
var Classes = require('../classes/classes.dao');

exports.createHorse = function (req, res, next) {
    var horse = {
        numer: req.body.numer,
        klasa: req.body.klasa,
        nazwa: req.body.nazwa,
        kraj: req.body.kraj,
        rocznik: req.body.rocznik,
        masc: req.body.masc,
        plec: req.body.plec,
        hodowca: req.body.hodowca,
        wlasciciel: req.body.wlasciciel,
        rodowod: req.body.rodowod,
        wynik: req.body.wynik,
    };

    horse.wynik = {
        noty: []
    };

    Horses.find({}, function (err, horses) {
        horses.forEach(val => {
            if (val.numer >= req.body.numer) {
                val.numer = val.numer + 1;
                Horses.update({_id: val._id}, val, function (err, val) {
                });
            }
        });
    }).then(function () {
        Classes.findOne({numer: req.body.klasa}, function (err, cl) {
            for (let i = 0; i < cl.komisja.length; i++) {
                horse.wynik.noty.push({
                    typ: 0,
                    glowa: 0,
                    kloda: 0,
                    nogi: 0,
                    ruch: 0
                });
            }
        }).then(function () {
            Horses.create(horse, function (err, horse) {
                if (err) {
                    res.json({
                        error: err
                    })
                }

                res.json({
                    message: "Horse created successfully"
                })
            });
        });
    });

};

exports.getHorse = function (req, res, next) {
    Horses.get({_id: req.params.id}, function (err, horse) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.send(horse);
    })
};

exports.getHorses = function (req, res, next) {
    Horses.find({}, null, {sort: {numer: 1}}, function (err, horses) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.send(horses);
    })
};

exports.updateHorse = function (req, res, next) {
    var horse = {
        numer: req.body.numer,
        klasa: req.body.klasa,
        nazwa: req.body.nazwa,
        kraj: req.body.kraj,
        rocznik: req.body.rocznik,
        masc: req.body.masc,
        plec: req.body.plec,
        hodowca: req.body.hodowca,
        wlasciciel: req.body.wlasciciel,
        rodowod: req.body.rodowod,
        wynik: req.body.wynik,
    };

    Horses.findOne({_id: req.params.id}, function (err, h) {
        if (h.numer !== req.body.numer) {
            Horses.find({}, null, {sort: {numer: 1}}, function (err, horses) {
                let isChanged = false;
                horses.forEach(val => {
                    if (val._id.toString() !== req.params.id) {
                        if (isChanged) {
                            val.numer = val.numer + 1;
                            Horses.update({_id: val._id}, val, function (err, val) {
                            });
                        }
                        if (val.numer == req.body.numer) {
                            val.numer = val.numer + 1;
                            isChanged = true;
                            Horses.update({_id: val._id}, val, function (err, val) {
                            });
                        }
                    }
                });
            });
        }
        if (h.klasa !== req.body.klasa) {
            horse.wynik = {
                noty: []
            };

            Classes.findOne({numer: req.body.klasa}, function (err, cl) {
                for (let i = 0; i < cl.komisja.length; i++) {
                    horse.wynik.noty.push({
                        typ: 0,
                        glowa: 0,
                        kloda: 0,
                        nogi: 0,
                        ruch: 0
                    });
                }
            }).then(function () {
                Horses.update({_id: req.params.id}, horse, function (err, horse) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    res.json({
                        message: "Horse updated successfully"
                    })
                });
            });
        } else {
            Horses.update({_id: req.params.id}, horse, function (err, horse) {
                if (err) {
                    res.json({
                        error: err
                    })
                }

                res.json({
                    message: "Horse updated successfully"
                })
            });
        }
    });

};

exports.removeHorse = function (req, res, next) {
    Horses.delete({_id: req.params.id}, function (err, horse) {
        if (err) {
            res.json({
                error: err
            })
        }

        res.json({
            message: "Horse deleted successfully"
        })
    })
};
