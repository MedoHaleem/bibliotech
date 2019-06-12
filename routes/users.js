import jwt from "jsonwebtoken";
import JSend from '../services/Jsend'

module.exports = app => {
    const User = app.db.models.User;
    const Institution = app.db.models.Institution;
    const cfg = app.libs.config;
    //Usually I don't write any business logic inside routes file instead  I use a controller to verify the params get result from service file and send the response, the service file which handle the business logic/ call db models
    // ex:
    // app.route('/customers/')
    //     .all(app.auth.authenticate())
    //     .get(CustomerController.getAllCustomers)
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
        if (req.body.email) {
            const userDomain = req.body.email.substring(req.body.email.lastIndexOf("@") +1);
            Institution.findOne({where: {emailDomain: userDomain}}).then(inst => {
                if(inst){
                    User.create({...req.body, InstitutionId: inst.id})
                        .then(result => {
                            JSend.success(res, result)
                        })
                        .catch(error => {
                            JSend.failUnprocessableEntity(res, error.message);
                        });
                } else {
                    JSend.failUnprocessableEntity(res,"Your email doesn't belong to one of our Institutions");
                }
            }).catch(error => {
                JSend.failUnprocessableEntity(res, error.message);
            });
        } else {
            JSend.failUnprocessableEntity(res,"email is missing or not valid");
        }

    });

    app.post("/users/signin", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.findOne({where: {email: email}})
                .then(user => {
                    if (User.isPassword(user.password, password)) {
                        JSend.success(res, {
                            //We can encode expiresIn, so the token expires after specific amount of time to reduce the opportunity of the attack of the token got compromised
                            //not added here for simplicity, personally I prefer to delegate the authentication to 3rd party service like Auth0
                            token: jwt.sign({id: user.id}, cfg.jwtSecret)
                        });
                    } else {
                        JSend.failNotAuthorized(res)
                    }
                })
                .catch(error =>  JSend.failNotAuthorized(res, error));
        } else {
            JSend.failNotAuthorized(res)
        }
    });
};