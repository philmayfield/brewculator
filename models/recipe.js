const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
