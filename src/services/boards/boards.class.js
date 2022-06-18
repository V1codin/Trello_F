const { Service } = require("feathers-mongoose");
const mongoose = require("mongoose");

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
      //console.log("subscribe error", e);
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
      console.log("e: ", e);
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

  async remove(boardId) {
    const session = await mongoose.startSession();

    const transactionOptions = {
      readPreference: "primary",
      readConcern: { level: "local" },
      writeConcern: { w: "majority" },
    };
    session.startTransaction(transactionOptions);

    try {
      const boardCollection = mongoose.connection.db.collection("boards");
      const listsCollection = mongoose.connection.db.collection("lists");

      const result = await Promise.all([
        boardCollection.deleteOne({ _id: boardId }, { session }),

        listsCollection.deleteMany(
          { boardId: mongoose.Types.ObjectId(boardId) },
          { session }
        ),
      ]);

      await session.commitTransaction();

      console.log("result: ", result);
      return result[0];
    } catch (e) {
      console.log("======================================: ", e);
      await session.abortTransaction();
      return Promise.reject(new Error("Invalid Board"));
    } finally {
      session.endSession();
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
