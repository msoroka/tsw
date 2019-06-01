var Horses = require('./horses.dao');

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

    Horses.create(horse, function (err, horse) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Horse created successfully"
        })
    })
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
    Horses.get({}, function (err, horses) {
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

    Horses.update({_id: req.params.id}, horse, function (err, horse) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Horse updated successfully"
        })
    })
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
