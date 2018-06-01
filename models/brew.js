const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BrewSchema = new Schema({
  version: {
    type: String,
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
