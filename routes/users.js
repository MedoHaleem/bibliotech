import jwt from "jsonwebtoken";

module.exports = app => {
    const User = app.db.models.User;
    const cfg = app.libs.config;

    app.route("/user")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .delete((req, res) => {
            Users.destroy({where: {id: req.user.id}})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.post("/users/create", (req, res) => {
        User.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/users/signin", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.findOne({where: {email: email}})
                .then(user => {
                    if (User.isPassword(user.password, password)) {
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.sign({id: user.id}, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => res.json({msg: error.message}));
        } else {
            res.sendStatus(401);
        }
    });
};