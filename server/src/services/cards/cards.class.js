const { Service } = require("feathers-mongoose");

/*
? Model
* name: { type: String, required: true },
* description: { type: String },
* order: { type: Number, required: true, default: 0 },
* archived: { type: Boolean, required: true, default: false },
* listId: { type: Schema.Types.ObjectId, ref: "lists" },
* boardId: { type: Schema.Types.ObjectId, ref: "boards" },
*/

exports.Cards = class Cards extends Service {
  constructor(opts, app) {
    super(opts, app);
  }
  async find(props) {
    const boardId = props.query.props;

    try {
      const payload = await super._find({ query: { boardId } });

      return payload;
    } catch (e) {
      return Promise.reject(new Error("Invalid Board"));
    }
  }

  async remove(id, params) {
    if (id) {
      try {
        const removedById = await super._remove(id);
        return removedById;
      } catch (e) {
        return Promise.reject(new Error("Invalid List"));
      }
    } else {
      try {
        const removedByQuery = await super._remove(null, { query: params });
        return removedByQuery;
      } catch (e) {
        return Promise.reject(new Error("Invalid List"));
      }
    }
  }
};
