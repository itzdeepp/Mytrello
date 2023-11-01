const express = require("express");
const { signUp, logIn } = require("../controller/user.controller");

const router = express.Router();

// signup end point
router.route("/signup").post(signUp)

// login end point
router.route("/login").post(logIn)

// export router
module.exports = router