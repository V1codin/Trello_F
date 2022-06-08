const { Service } = require("feathers-mongoose");
const { ObjectId } = require("mongodb");

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

  async addBoardToUser(boardId, userId) {
    try {
      const _id = new ObjectId(userId);

      const { data } = await this._find({
        query: { _id },
      });

      const user = data[0];
      const subs = [...new Set([...user.subs, boardId])];

      const result = await this.patch(_id, {
        subs,
      });

      return result;
    } catch (e) {
      return Promise.reject(new Error("Add board to user failed"));
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
