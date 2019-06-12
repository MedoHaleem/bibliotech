import supertest from "supertest";
import chai from "chai";
import app from "../index.js";

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;

exports.deleteAll = function () {
    return new Promise((reslove, reject) => {
        app.db.sequelize.sync({force: true, logging: false, verbose: false}).then(() => reslove())
    })
}
