const { Service } = require("feathers-mongoose");

exports.Lists = class Lists extends Service {
  constructor(opts, app) {
    super(opts, app);
  }
  async find(props) {
    const boardId = props.query.props;

    try {
      const payload = await super._find({ query: { boardId } });

      return payload;
    } catch (e) {
      throw new Error("Invalid Board");
    }
  }
};
