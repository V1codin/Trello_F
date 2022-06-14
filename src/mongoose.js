const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function (app) {
  mongoose
    .connect(process.env.MONGO_DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to mongoose"))
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  app.set("mongooseClient", mongoose);
};
