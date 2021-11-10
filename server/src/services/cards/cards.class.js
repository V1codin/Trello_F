const { Service } = require("feathers-mongoose");

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
