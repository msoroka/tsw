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

        return horses;
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

            return horse;
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
        _id: req.body._id
    };

    let cases = 0;

    Horses.findOne({_id: req.params.id}, function (err, h) {
        Horses.find({}, null, {sort: {numer: 1}}, function (err, horses) {
            if (h.numer !== req.body.numer) {
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
            }

            return horses;
        }).then(function () {
            Classes.findOne({numer: req.body.klasa}, function (err, cl) {
                if (h.klasa !== req.body.klasa) {
                    horse.wynik = {
                        noty: []
                    };
                    for (let i = 0; i < cl.komisja.length; i++) {
                        horse.wynik.noty.push({
                            typ: 0,
                            glowa: 0,
                            kloda: 0,
                            nogi: 0,
                            ruch: 0
                        });
                    }
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

                return horse;
            });

            return horse;
        }).then(function () {
            Horses.find({}, null, {sort: {numer: 1}}, function (err, horses) {
                let horseTyp = 0;
                let horseGlowa = 0;
                let horseKloda = 0;
                let horseNogi = 0;
                let horseRuch = 0;
                let horseSuma = 0;
                Array.from(horse.wynik.noty).forEach(hw => {
                    horseTyp += Number(hw.typ);
                    horseGlowa += Number(hw.glowa);
                    horseKloda += Number(hw.kloda);
                    horseNogi += Number(hw.nogi);
                    horseRuch += Number(hw.ruch);
                });
                horseSuma = horseTyp + horseGlowa + horseKloda + horseNogi + horseRuch;


                horses.forEach(val => {
                    if (val.klasa == horse.klasa && val._id.toString() != horse._id) {
                        let vTyp = 0;
                        let vGlowa = 0;
                        let vKloda = 0;
                        let vNogi = 0;
                        let vRuch = 0;
                        let vSuma = 0;

                        Array.from(val.wynik.noty).forEach(v => {
                            vTyp += Number(v.typ);
                            vGlowa += Number(v.glowa);
                            vKloda += Number(v.kloda);
                            vNogi += Number(v.nogi);
                            vRuch += Number(v.ruch);
                        });
                        vSuma = vTyp + vGlowa + vKloda + vNogi + vRuch;

                        if(vSuma == horseSuma &&
                            vTyp == horseTyp &&
                            vRuch == horseRuch &&
                            horse.wynik.rozjemca.length !== 0) {
                            cases++;
                        }
                        else if (vSuma == horseSuma &&
                            vTyp == horseTyp &&
                            vRuch == horseRuch &&
                            (horse.wynik.rozjemca === 0 || horse.wynik.rozjemca.length == 0)) {
                            cases++;
                            horse.wynik.rozjemca = 0;
                            val.wynik.rozjemca = 0;

                            Horses.update({_id: val._id}, val, function (err, horse) {
                            });
                        }
                    }
                });
                if (cases === 0) {
                    horse.wynik.rozjemca = [];
                }
                Horses.update({_id: horse._id}, horse, function (err, horse) {
                });
            });
        });
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
