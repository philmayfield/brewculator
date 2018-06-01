const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VersionSchema = new Schema({
  recipe: {
    type: Number,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
