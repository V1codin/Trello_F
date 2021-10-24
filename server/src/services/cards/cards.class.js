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
      /*
      TODO
      return error { code: /some code/, message : "Invalid Board" etc}
      */
      throw new Error("Invalid Board");
    }
  }
};
