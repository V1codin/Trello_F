const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");
const {
  getOwnAndSubscribedBoards,
} = require("../../hooks/getOwnAndSubscribedBoards");

const { transactionManager } = require("feathers-mongoose");
const isTransactionEnable = process.env.TRANSACTION_ENABLE || false;
const skipPath = ["login"];

const setUserIdToQuery = setField({
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
    find: [getOwnAndSubscribedBoards],
    get: [setUserIdToQuery],
    create: [setUserForCreation],
    update: [setUserIdToQuery],
    patch: [setUserIdToQuery],
    remove: [
      setUserIdToQuery,
      (isTransactionEnable,
      async (hook) => transactionManager.beginTransaction(hook, skipPath)),
    ],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [(isTransactionEnable, transactionManager.commitTransaction)],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [(isTransactionEnable, transactionManager.rollbackTransaction)],
  },
};
