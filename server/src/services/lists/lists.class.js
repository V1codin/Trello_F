const { Service } = require("feathers-mongoose");
const mongoose = require("mongoose");

/*
? Model
* name: { type: String, required: true },
* order: { type: Number, required: true, default: 0 },
* archived: { type: Boolean, required: true, default: false },
* boardId: { type: Schema.Types.ObjectId, ref: "boards" },
*/

exports.Lists = class Lists extends Service {
  constructor(opts, app) {
    super(opts, app);
    this.app = app;
  }

  async find(props) {
    const boardId = props.query.props;
    if (!boardId) return Promise.reject(new Error("Invalid Board"));

    try {
      const payload = await super.find({ query: { boardId } });

      return payload;
    } catch (e) {
      // throw new Error("Invalid Board");
      return Promise.reject(new Error("Invalid Board"));
    }
  }

  async remove(props) {
    const listId = props._id;
    try {
      // ? remove all related cards when a list is deleting
      await this.app
        .service("cards")
        .remove(null, { listId: mongoose.Types.ObjectId(listId) });

      const listsPayload = await super._remove(listId);

      return listsPayload;
    } catch (e) {
      return Promise.reject(new Error("Invalid List"));
    }
  }
};
