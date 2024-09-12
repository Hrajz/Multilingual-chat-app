const Chat = require("../models/Chat.js");

// Start chat between two users
exports.startChat = async (req, res) => {
  const { userId1, userId2 } = req.body;
  let chat = await Chat.findOne({ users: { $all: [userId1, userId2] } });
  if (!chat) {
    chat = new Chat({ users: [userId1, userId2], messages: [] });
    await chat.save();
  }
  res.json(chat);
};

// Send message
exports.sendMessage = async (req, res) => {
  const { chatId, sender, message } = req.body;
  const chat = await Chat.findById(chatId);
  chat.messages.push({ sender, message, timestamp: new Date() });
  await chat.save();
  res.json(chat);
};
