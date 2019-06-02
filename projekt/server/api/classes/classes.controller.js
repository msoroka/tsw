var Classes = require('./classes.dao');

exports.createClass = function (req, res, next) {
    var cl = {
        numer: req.body.numer,
        kat: req.body.kat,
        czempionat: req.body.czempionat,
        komisja: req.body.komisja
    };

    Classes.create(cl, function (err, cl) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Class created successfully"
        })
    })
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
    })
};

exports.updateClass = function (req, res, next) {
    var cl = {
        numer: req.body.numer,
        kat: req.body.kat,
        czempionat: req.body.czempionat,
        komisja: req.body.komisja
    };

    Classes.update({_id: req.params.id}, cl, function (err, cl) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Class updated successfully"
        })
    })
}

exports.removeClass = function (req, res, next) {
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
