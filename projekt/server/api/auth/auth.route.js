var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (router) {
    let users = [
        {
            id: 1,
            login: "msoroka",
            password: "Alsen1.pl"
        }
    ];

    router.post("/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }

            req.login(user, err => {
                res.json({
                    token: Math.random().toString(36).substr(2),
                    user: {
                        name: "Mateusz Soroka"
                    }
                });
            });
        })(req, res, next);
    });

    router.post("/logout", function (req, res) {
        req.logout();
        return res.send();
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: "login",
                passwordField: "password"
            },

            (username, password, done) => {
                let user = users.find((user) => {
                    return user.login === username && user.password === password
                });

                if (user) {
                    done(null, user)
                } else {
                    done(null, false, {message: 'Incorrect username or password'})
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        let user = users.find((user) => {
            return user.id === id
        });

        done(null, user)
    });
};
