const { Service } = require("feathers-mongoose");

/*
? Model
* title: { type: String, required: true },
* bg: { type: String, required: true },
* ownerId: { type: Schema.Types.ObjectId, ref: "users" },
* memberIds: [{ type: String }],
* pendingMemberIds: [{ type: String }],
*/

exports.Boards = class Boards extends Service {
  constructor(opts, app) {
    super(opts, app);
    this.app = app;
  }

  async getOwner(id) {
    const board = await super._find({ query: { _id: id } });

    const ownerId = await board.data[0].ownerId;

    return ownerId;
  }

  async subscribe(boardId, members) {
    try {
      const {
        data: [board],
      } = await super._find({ query: { _id: boardId } });

      const newMembers = [...new Set([...board.pendingMemberIds, ...members])];

      const patchedBoard = await super._patch(boardId, {
        pendingMemberIds: newMembers,
      });

      const ownerName = await this.app
        .service("users")
        .getName(patchedBoard.ownerId);

      const noteProps = { name: patchedBoard.title, ownerName };

      await this.app
        .service("notifications")
        .subscribingNote(noteProps, members);

      return patchedBoard;
    } catch (e) {
      //console.log("subscribe error", e);
      return Promise.reject(new Error("Invalid data for subscribe"));
    }
  }

  async patch(id, data) {
    const { type } = data;

    if (type === "subscribe") {
      // * patching board for subscribing users to the board
      // ? add user ids to pendingMemberIds array +
      // ? send to the users notifications (not all pending members. only received from data) +
      // ? accepting the notification adds boardId to uses subs array
      // ? and moves the user id from pendingMemberIds array to members array

      try {
        const { members } = data;

        const patchedBoard = await this.subscribe(id, members);

        return patchedBoard;
      } catch (e) {
        return Promise.reject(new Error("Invalid Board"));
      }
    }
  }

  // TODO remove method that removes a board and related lists and cards
  /*

  // ! DEV for imitate server load

  async remove(params) {
    const res = await new Promise((res) => {
      setTimeout(() => {
        res(params);
      }, 4000);
    });

    return res;
  }

  */
};
