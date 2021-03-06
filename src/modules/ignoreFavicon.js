module.exports = (app) => {
  app.get("/favicon.ico", (req, res) => res.status(204));
};
