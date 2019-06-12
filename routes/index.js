/**
 * The default index route handler.
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
import JSend from '../services/Jsend'
module.exports = app => {
  app.get("/", (req, res) => {
    JSend.success(res, "Express Code Challenge Started")
  });
};
