module.exports = app => {
    // this to prevent test from running several instance of the app
    if (process.env.NODE_ENV !== "test") {
        app.db.sequelize.sync().done(() => {
            app.listen(app.get("port"), () => {
                console.log(`Bibliotech API - Port ${app.get("port")}`);
            });
        });
    }
};