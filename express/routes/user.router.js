const express = require("express");

//ctr
const { register, login, updateUser } = require("../ctr/user.ctr.js");

//middleware
const {
  userValidate,
  userLoginValidate,
  userUpdateValidate,
} = require("../meddleware/user.midle.js");

const router = express.Router();
router.route("/register").post(userValidate, register);
router.route("/login").post(userLoginValidate, login);
router.route("/update-user").put(userUpdateValidate, updateUser);

module.exports = router;
