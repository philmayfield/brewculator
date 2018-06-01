const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GravitySchema = new Schema({
  brew: {
    type: String,
    required: true
  },
  gravity: {
    type: Decimal128,
    required: true
  },
  temp: {
    type: Decimal128,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
