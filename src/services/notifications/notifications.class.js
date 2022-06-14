const { Service } = require("feathers-mongoose");
const { ObjectId } = require("mongodb");

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

  async subscribingNote(props, members, boardId) {
    try {
      const { ownerName, name } = props;

      const text = this.getInvitingMessage(ownerName, name);

      const result = await Promise.all(
        members.map(async (member) => {
          const note = {
            text,
            recipient: member,
            type: "invite",
            inviteToBoardId: boardId,
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

  async clearNotesAcceptedClients(boardId, userId) {
    try {
      const { data } = await this._find({
        query: { inviteToBoardId: boardId, recipient: new ObjectId(userId) },
      });

      const updatedNotes = await Promise.all(
        data.map(async ({ _id }) => {
          return this.remove(_id);
        })
      );

      return updatedNotes;
    } catch (e) {
      console.log("remove accepted note err", e);
      return Promise.reject(new Error("Invalid data for subscribe"));
    }
  }
};
