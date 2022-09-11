const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const passcode = require("../middleware/passcode");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task");

router.use(auth);

router.post("/tasks", passcode, createTask);
router.get("/tasks", getTasks);
router.patch("/tasks/:id", passcode, updateTask);
router.delete("/tasks/:id", passcode, deleteTask);

module.exports = router;
