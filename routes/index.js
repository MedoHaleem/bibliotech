/**
 * The default index route handler.
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports = app => {
  app.get("/", (req, res) => {
    res.json({status: `Express Code Challenge Started`});
  });
};
