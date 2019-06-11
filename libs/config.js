// We load the proper config file depending on the environment, the reason is to unify config names in the app
// for example having google-map api key one for development/staging and the other one for production
const dbConfig = require("../config/dbconfig");

module.exports = () => {
    const env = process.env.NODE_ENV;
    if (env) {
        const config =  require(`../config/config.${env}.js`);
        // we load dbconfig and destructure it here so Sequelize-Cli can access connection options depending on the env
        return {...dbConfig, ...config}
    } else {
        const defaultConfig =  require(`../config/config.development.js`);
        return {...dbConfig, ...defaultConfig}
    }
};
