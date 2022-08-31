const express = require("express");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const passcode = require("../middleware/passcode");
const errorHandler = require("../middleware/errorhandler");
const { signUp, signIn, updateUser, getUser, deleteUser } = require("../controllers/user");

const mySchema = Joi.object().keys({
  passcode: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const router = new express.Router();

router.post("/users", signUp);

router.post("/users/login", signIn);

router.get("/users/me", auth, getUser);

router.patch("/users/me", auth, passcode, updateUser);

router.delete("/users/me", auth, passcode, deleteUser);

module.exports = router;
