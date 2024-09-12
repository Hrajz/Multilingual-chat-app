const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ sender: String, message: String, timestamp: Date }],
});
module.exports = mongoose.model("Chat", chatSchema);
