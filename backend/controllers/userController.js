const User = require("../models/User");

// Fetch friends
exports.getFriends = async (req, res) => {

  const userId = req.query.userId;

  const user = await User.findById(userId).populate("friends", "username");
  if (!user) return res.status(404).json({ message: "User not found!" });

  res.json(user.friends);
};
