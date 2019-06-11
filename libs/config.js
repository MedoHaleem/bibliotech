// We load the proper config file depending on the environment, the reason is to unify config names in the app
// for example having google-map api key one for development/staging and the other one for production
module.exports = () => {
    const env = process.env.NODE_ENV;
    if (env) {
        return require(`../config/config.${env}.js`)
    } else {
        return require('../config/config.development.js')
    }
};
