const { Service } = require("feathers-mongoose");

exports.Users = class Users extends Service {
  constructor(opts, app) {
    super(opts, app);

    this.rooms = [
      {
        name: "Default",
      },
    ];
  }
};
