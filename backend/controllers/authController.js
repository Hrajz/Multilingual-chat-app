const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  if (userExists){
    console.log("email already exists");
    return res.status(400).json({ msg: "User already exists" });
  }
  if (usernameExists){
    console.log("Username already exists");
    return res.status(400).json({ msg: "User already exists" });
  }
    

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  await user.save();
  res.status(201).json({ msg: "User registered" });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const username = user._id;
  res.json({ token, username });
};

// search user
exports.search = async (req, res) => {
   const { query } = req.body; // sending user id in the request body

   // Your search logic here
   console.log(query)
   const users = await User.find({ username: query});

   if (users.length === 0) {
     return res.status(404).json({ message: "No users found" });
   }

   res.json(users);
};
