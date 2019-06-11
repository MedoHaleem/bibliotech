import bodyParser from "body-parser";

module.exports = app => {
    app.set("port", app.libs.config.port);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
};