const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Schema.Types.ObjectId,
    ref: "Version"
  },
  versions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Version"
    }
  ]
});

let Recipe = mongoose.model("recipe", RecipeSchema);

module.exports = Recipe;
