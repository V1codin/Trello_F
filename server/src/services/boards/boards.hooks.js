const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");

const setUserId = setField({
  from: "params.user._id",
  as: "params.query.ownerId",
});
const setUserForCreation = setField({
  from: "params.user._id",
  as: "data.ownerId",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [setUserId],
    get: [setUserId],
    create: [setUserForCreation],
    update: [setUserId],
    patch: [setUserId],
    remove: [setUserId],
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
