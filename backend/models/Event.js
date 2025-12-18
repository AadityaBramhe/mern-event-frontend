const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  capacity: Number,
  image: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Event", eventSchema);
