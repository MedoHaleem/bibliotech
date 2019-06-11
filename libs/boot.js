module.exports = app => {
    app.db.sequelize.sync({force: true}).done(() => {
        app.listen(app.get("port"), () => {
            console.log(`Bibliotech API - Port ${app.get("port")}`);
        });
    });
};