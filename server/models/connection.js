const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
  users: {
    type: [String],
    required: [true, "Please specify users"]
  },
  team: {
    type: String,
  },
  dateTime: {
    type: String,
    required: [true, "Please specify date and time"]
  }
});

module.exports = mongoose.model("Connection", ConnectionSchema);
