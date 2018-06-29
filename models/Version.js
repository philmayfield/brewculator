const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VersionSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  },
  version: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  brews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Brew"
    }
  ]
});

let Version = mongoose.model("version", VersionSchema);

module.exports = Version;
