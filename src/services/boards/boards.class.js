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

  async initSubscription(boardId, members) {
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
        .subscribingNote(noteProps, members, boardId);

      return patchedBoard;
    } catch (e) {
      return Promise.reject(new Error("Invalid data for subscribe"));
    }
  }

  async acceptSubscription(boardId, accepterId) {
    try {
      const {
        data: [board],
      } = await super._find({ query: { _id: boardId } });

      const newPendingMembers = board.pendingMemberIds.filter(
        (item) => item !== accepterId
      );

      const newMembers = [...new Set([...board.memberIds, accepterId])];

      const patchedBoard = await Promise.all([
        super._patch(boardId, {
          pendingMemberIds: newPendingMembers,
          memberIds: newMembers,
        }),
        this.app.service("users").addBoardToUser(boardId, accepterId),
        this.app
          .service("notifications")
          .clearNotesAcceptedClients(boardId, accepterId),
      ]);

      return patchedBoard[0];
    } catch (e) {
      return Promise.reject(new Error("Invalid data for accept"));
    }
  }

  async patch(boardId, dataFromClient) {
    const { type } = dataFromClient;

    if (type === "subscribe") {
      // * patching board for subscribing users to the board
      // ? add user ids to pendingMemberIds array +
      // ? send to the users notifications (not all pending members. only received from data) +
      // ? accepting the notification adds boardId to uses subs array
      // ? and moves the user id from pendingMemberIds array to members array

      try {
        const { members } = dataFromClient;

        const patchedBoard = await this.initSubscription(boardId, members);

        return patchedBoard;
      } catch (e) {
        return Promise.reject(new Error("Invalid Board"));
      }
    }

    if (type === "accept") {
      try {
        const { accepterId } = dataFromClient;

        const patchedBoard = await this.acceptSubscription(boardId, accepterId);

        return patchedBoard;
      } catch (e) {
        return Promise.reject(new Error("Invalid Board"));
      }
    }
  }

  async remove(boardId, params) {
    try {
      const issuerId = params.user._id;
      const {
        data: [board],
      } = await this.find({
        query: {
          _id: boardId,
        },
      });

      if (String(board.ownerId) === String(issuerId)) {
        const result = await Promise.all([
          super._remove(boardId),

          this.app.service("lists").removeNested(boardId),
        ]);

        return result[0];
      }

      return Promise.reject(
        Object.assign(
          new Error("You have to be owner of the board to remove it"),
          { code: 4011 }
        )
      );
    } catch (e) {
      return Promise.reject(new Error("Invalid Board"));
    }
  }

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
