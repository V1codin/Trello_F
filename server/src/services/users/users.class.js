const { Service } = require("feathers-mongoose");

exports.Users = class Users extends Service {
  constructor(opts, app) {
    super(opts, app);
  }

  async getName(id) {
    try {
      const {
        data: [{ displayName }],
      } = await super._find({ query: { _id: id } });

      return displayName;
    } catch (e) {
      return Promise.reject(new Error("Invalid id"));
    }
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

  async find(props) {
    const { query } = props;
    if (!query) return Promise.reject(new Error("Invalid Login"));

    try {
      const payload = await super._find({ query });

      return payload;
    } catch (e) {
      return Promise.reject(new Error("Invalid Login"));
    }
  }
};
