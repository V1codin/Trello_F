const { Service } = require("feathers-mongoose");

/*
? Model
* text: { type: String, required: true },
* recipient: { type: Schema.Types.ObjectId, ref: "users", required: true },
* type: { type: String, default: "info" },
*/

exports.Notifications = class Notifications extends Service {
  constructor(opts, app) {
    super(opts, app);
    this.app = app;
  }

  getInvitingMessage(ownerName, boardName) {
    if (!ownerName || !boardName) return "";
    return `${ownerName} has invited you to ${boardName}`;
  }

  async subscribingNote(props, members) {
    try {
      const { ownerName, name } = props;

      const text = this.getInvitingMessage(ownerName, name);

      const result = await Promise.all(
        members.map(async (member) => {
          const note = {
            text,
            recipient: member,
            type: "invite",
          };

          // ? use create instead of _create
          // ? for intercept created event in channels.js
          return this.create(note);
        })
      );

      return result;
    } catch (e) {
      console.log("sub note err", e);
      return Promise.reject(new Error("Invalid data for subscribe"));
    }
  }
};
