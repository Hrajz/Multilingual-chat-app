const express = require("express");
const router = express.Router();
const { getFriends  } = require("../controllers/userController");

router.get("/friends", getFriends);

module.exports = router;
