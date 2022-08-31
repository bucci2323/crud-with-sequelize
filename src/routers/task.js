const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();
const Joi = require("joi");
const validator = require("validator");
const userSchema = require("../routers/user");
const passcode = require("../middleware/passcode");
const { createTask, getTask, updateTask, deleteTask } = require("../controllers/task");

const taskSchema = Joi.object().keys({
  description: Joi.string().required(),
  status: Joi.string(),
  level: Joi.string(),
  passcode: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  description: Joi.string(),
  status: Joi.string(),
  level: Joi.string(),
  passcode: Joi.string().required(),
});

router.post("/tasks", auth, passcode, createTask);
router.get("/tasks", auth, getTask)
router.patch("/tasks/:id", auth, passcode, updateTask);

  router.delete("/tasks/:id", auth, passcode, deleteTask);




module.exports = router;
