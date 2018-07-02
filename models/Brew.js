const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BrewSchema = new Schema({
  version: {
    type: Schema.Types.ObjectId,
    ref: "Version"
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  gravity: {
    type: Schema.Types.ObjectId,
    ref: "Gravity"
  },
  gravities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gravity"
    }
  ]
});

let Brew = mongoose.model("brew", BrewSchema);

module.exports = Brew;
