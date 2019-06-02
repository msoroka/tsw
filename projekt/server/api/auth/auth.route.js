module.exports = function (router) {
    router.post('/login', function (req, res, next) {
        var login = req.body.login;
        var password = req.body.password;

        if (login === "msoroka" && password === "Alsen1.pl") {
            res.json({
               token: Math.random().toString(36).substr(2),
               user: {
                   name: "Mateusz Soroka"
               }
            });
        } else {
            throw new Error('WRONG');
        }
    });
};
