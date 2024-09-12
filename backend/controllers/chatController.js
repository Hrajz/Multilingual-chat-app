const Chat = require("../models/Chat.js");
const User = require("../models/User");
const mongoose = require("mongoose");


// Start chat between two users
exports.startChat = async (req, res) => {
  const { users } = req.body; // Expect an array of ObjectId strings (user IDs)
  console.log(users);

  try {
    // Validate the incoming user IDs (ensure they are ObjectIds)
    const validUsers = users.map((id) => new mongoose.Types.ObjectId(id));

    // Check if a chat already exists between the users
    const existingChat = await Chat.findOne({
      users: { $all: validUsers, $size: validUsers.length },
    });

    if (existingChat) {
      // If chat exists, return the existing chat
      console.log("chat exists");
      return res.status(200).json(existingChat);
    }

    // If chat does not exist, create a new one
    const newChat = new Chat({
      users: validUsers, // Store valid ObjectIds
      messages: [],
    });

    await newChat.save();

    // Add each user to the other user's friends list
    await Promise.all(
      validUsers.map(async (userId, index) => {
        const otherUserId = validUsers[1 - index]; // Get the other user
        await User.findByIdAndUpdate(userId, {
          $addToSet: { friends: otherUserId }, // Add the other user to friends if not already added
        });
      })
    );

    res.status(201).json(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Send message
exports.sendMessage = async (req, res) => {
  const { chatId, sender, message } = req.body;
  const chat = await Chat.findById(chatId);
  chat.messages.push({ sender, message, timestamp: new Date() });
  await chat.save();
  res.json(chat);
};
