// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { Schema } = require("mongoose");
const singleRoomSchema = new Schema({
  roomName: String,
  creator: {
    type: String,
    default: "Your mom's so fat...",
  },

  /*
  subscribers: {
    type: Array,
    default: [],
  },
  */
});

const roomsSchema = new Schema({
  type: Array,
  of: singleRoomSchema,
});

const schemaProps = {
  username: { type: String, unique: true, require: true },

  password: { type: String, required: true },

  rooms: [roomsSchema],

  displayName: {
    type: String,
    default: "",
  },

  //email: { type: String, unique: true },

  imageURL: {
    type: String,
    default: "",
  },
};

module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");

  const schema = new mongooseClient.Schema(schemaProps, {
    timestamps: true,
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};

/*

const subscribersSchema = new mongoose.Schema({
  type: Object,
  default: {},
});

*/
