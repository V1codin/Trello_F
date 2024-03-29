// boards-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "boards";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      title: { type: String, required: true },
      bg: { type: String, required: true },
      ownerId: { type: Schema.Types.ObjectId, ref: "users" },
      // ? prev
      // ? memberIds: [{ type: Schema.Types.ObjectId, ref: "users" }],
      memberIds: [{ type: String }],

      // ! send board invite -> invited client's ID put to pending.
      // ! agree from invited client -> ID to memberIds
      // ! and boardId to SUBS array of the client
      pendingMemberIds: [{ type: String }],
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
