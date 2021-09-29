const { Service } = require("feathers-mongoose");

exports.Boards = class Boards extends Service {
  constructor(opts, app) {
    super(opts, app);
    this.app = app;
  }
};
