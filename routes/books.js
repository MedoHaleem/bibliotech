import JSend from '../services/Jsend'
module.exports = app => {
    const Institution = app.db.models.Institution;
    app.route('/books')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Institution.findOne({where: {id: req.user.InstitutionId}}).then(insit => {
                if (insit) {
                  insit.getBooks().then(data => JSend.success(res, {books: data}))
                } else {
                    JSend.failWithNotFound(res)
                }
            })
        })
};
