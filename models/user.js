const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ]
});

let User = mongoose.model("user", UserSchema);

module.exports = User;
