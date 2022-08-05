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

  async remove(id) {
    try {
      const removed = await super._remove(id);
      const { recipient, inviteToBoardId } = removed;

      await this.clearNotesAcceptedClients(inviteToBoardId, recipient);

      const boardsService = this.app.service("boards");

      const {
        data: [{ pendingMemberIds }],
      } = await boardsService._find({ query: { _id: inviteToBoardId } });

      const newMembers = pendingMemberIds.filter(
        (item) => item !== String(recipient)
      );

      await boardsService._patch(inviteToBoardId, {
        pendingMemberIds: newMembers,
      });

      return removed;
    } catch (e) {
      console.log("notification remove error: ", e);

      return Promise.reject(new Error("Invalid notification data"));
    }
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
          //? try this for optiomize performance
          //? return this._remove(_id);
        })
      );

      return updatedNotes;
    } catch (e) {
      console.log("remove accepted note err", e);
      return Promise.reject(new Error("Invalid data for remove notes"));
    }
  }
};
