const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GravitySchema = new Schema({
  // brew: {
  //   type: String,
  //   required: true
  // },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  },
  version: {
    type: Schema.Types.ObjectId,
    ref: "Version"
  },
  brew: {
    type: Schema.Types.ObjectId,
    ref: "Brew"
  },
  gravity: {
    type: Schema.Types.Decimal128,
    required: true
  },
  temp: {
    type: Schema.Types.Decimal128
  },
  notes: {
    type: Schema.Types.String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let Gravity = mongoose.model("gravity", GravitySchema);

module.exports = Gravity;
