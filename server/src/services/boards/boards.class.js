const { Service } = require("feathers-mongoose");

exports.Boards = class Boards extends Service {
  constructor(opts, app) {
    super(opts, app);
    this.app = app;
  }

  async getOwner(id) {
    const board = await super._find({ query: { _id: id } });

    const ownerId = await board.data[0].ownerId;

    return ownerId;
  }

  // TODO remove method that removes a board and related lists and cards
  /*

  // ! DEV for imitate server load

  async remove(params) {
    const res = await new Promise((res) => {
      setTimeout(() => {
        res(params);
      }, 4000);
    });

    return res;
  }

  */
};
