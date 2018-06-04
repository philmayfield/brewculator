const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BrewSchema = new Schema({
  // version: {
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
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  gravities: {
    type: Schema.Types.ObjectId,
    ref: "Gravity"
  }
});

let Brew = mongoose.model("brew", BrewSchema);

module.exports = Brew;
