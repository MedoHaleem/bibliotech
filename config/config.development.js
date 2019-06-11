// we load dbconfig and destructure it here so Sequelize-Cli can access connection options depending on the env
const dbConfig = require("./dbconfig");

module.exports = {
    ...dbConfig,
    port: 3000
};