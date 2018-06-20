const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GravitySchema = new Schema({
  brew: {
    type: Schema.Types.ObjectId,
    ref: "Brew"
  },
  gravity: {
    type: Schema.Types.Number,
    required: true
  },
  temp: {
    type: Schema.Types.Number
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
