module.exports = {
    require: ["@babel/register", "test/helpers"],
    reporter: 'spec',
    slow: 500,
    timeout: 2000,
    ui: 'bdd'
};
