module.exports = (req, res, next) => {
  // eslint-disable-line consistent-return
  res.header(
    "Access-Control-Allow-Origin",
    "*"
    // "http://movies46.hostronavt.ru"
  );
  res.header("Vary", "Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token, X-CSRF-Token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
};
