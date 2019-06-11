import jwt from "jsonwebtoken";
import JSend from '../services/Jsend'

module.exports = app => {
    const User = app.db.models.User;
    const cfg = app.libs.config;

    app.route("/user")
        .all(app.auth.authenticate())
        .get((req, res) => {
            User.findByPk(req.user.id, {
                attributes: ["id", "name", "email"]
            })
                .then(result => JSend.success(res, result))
                .catch(error => {
                    JSend.failUnprocessableEntity(res,{msg: error.message});
                });
        })
        .delete((req, res) => {
            User.destroy({where: {id: req.user.id}})
                .then(result => JSend.successWithoutResponse(res))
                .catch(error => {
                    JSend.failUnprocessableEntity(res,{msg: error.message});
                });
        });

    app.post("/users/create", (req, res) => {
        User.create(req.body)
            .then(result => JSend.success(res, result))
            .catch(error => {
                JSend.failUnprocessableEntity(res,{msg: error.message});
            });
    });

    app.post("/users/signin", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.findOne({where: {email: email}})
                .then(user => {
                    if (User.isPassword(user.password, password)) {
                        JSend.success(res, {
                            token: jwt.sign({id: user.id}, cfg.jwtSecret)
                        });
                    } else {
                        JSend.failNotAuthorized(res)
                    }
                })
                .catch(error => res.json({msg: error.message}));
        } else {
            res.sendStatus(401);
        }
    });
};