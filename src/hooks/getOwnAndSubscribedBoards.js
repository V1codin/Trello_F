async function getOwnAndSubscribedBoards(context) {
  const user = context.params.user;

  if (user) {
    context.params.query = {
      $or: [{ ownerId: user._id }, { _id: { $in: user.subs } }],
    };
  }
  return context;
}

module.exports = { getOwnAndSubscribedBoards };
