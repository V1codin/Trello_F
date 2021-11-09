const mongoose = require("mongoose");

async function isBoardOwner(context) {
  const boardId = context.params.query.props;
  if (!boardId) return context;

  const service = mongoose.model("boards");
  const board = await service.findOne({ _id: boardId });

  if (board) {
    const userId = context.params.user._id;
    if (
      board.ownerId.toString() === userId.toString() ||
      board.memberIds.includes(userId.toString())
    )
      return context;
    else {
      return Promise.reject(new Error("Un-Authorized"));
    }
  }

  return context;
}

module.exports = { isBoardOwner };
