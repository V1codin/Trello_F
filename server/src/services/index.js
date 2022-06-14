const users = require("./users/users.service.js");
const boards = require("./boards/boards.service.js");
const cards = require("./cards/cards.service.js");
const lists = require("./lists/lists.service.js");
const notifications = require("./notifications/notifications.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(boards);
  app.configure(cards);
  app.configure(lists);
  app.configure(notifications);
};
