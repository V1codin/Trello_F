const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");

const setUserIdToQuery = setField({
  from: "params.user._id",
  as: "params.query.recipient",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [setUserIdToQuery],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
