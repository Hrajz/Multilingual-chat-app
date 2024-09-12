const express = require("express");
const { register, login, search} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/search", search);

module.exports = router;
