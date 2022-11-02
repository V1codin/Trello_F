// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { Schema } = require("mongoose");

const schemaProps = {
  username: { type: String, unique: true, require: false },

  password: { type: String, required: false },

  displayName: {
    type: String,
    default: "",
  },

  externalLogin: { type: String, require: false, default: "local" },
  email: { type: String, unique: true, require: true },

  subs: [{ type: Schema.Types.ObjectId, ref: "boards" }],

  imageURL: {
    type: String,
    default: "",
  },

  nameAlias: { type: String, require },
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
