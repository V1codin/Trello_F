const { Service } = require("feathers-mongoose");

exports.Users = class Users extends Service {
  constructor(opts, app) {
    super(opts, app);
  }
  /*
    // ! DEV for imitate server load
  async get(...props) {
    const payload = new Promise(async (res) => {
      const result = await super._get(props[0]);
      console.log("result: ", result);

      setTimeout(() => res(result), 2000);
    });

    return payload;
  }
  */
};
