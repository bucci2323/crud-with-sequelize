const express = require("express");
const auth = require("../middleware/auth");
const passcode = require("../middleware/passcode");
const {
  signUp,
  signIn,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/user");
const router = new express.Router();

router.post("/users", signUp);

router.post("/users/login", signIn);

router.get("/users/me", auth, getUser);

router.patch("/users/me", auth, passcode, updateUser);

router.delete("/users/me", auth, passcode, deleteUser);

module.exports = router;
