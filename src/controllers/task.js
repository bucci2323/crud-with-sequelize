const Task = require("../models/task");
const Joi = require("joi");
const User = require("../models/user");
const { ValidationError, NotFoundError } = require("../middleware/helper");

const taskSchema = Joi.object().keys({
  description: Joi.string().required(),
  status: Joi.string(),
  level: Joi.string(),
  passcode: Joi.string().required(),
});

const createTask = async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const task = new Task({
      ...value,
      user_id: req.user.id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    next(e);
  }
};
const getTasks = async (req, res, next) => {
  // getting all the tasks that belongs to the req.user
  // getting all the tasks that has a user id of req.user.id
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  allowedUpdates = ["description", "status", "passcode"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) throw new ValidationError("invalid updates");
  try {
    const task = await Task.findOne({
      id: req.params.id,
      user_id: req.user.id,
    });

    if (!task) throw new NotFoundError("No task");

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      id: req.params.id,
      user_id: req.user.id,
    });
    if (!task) throw new NotFoundError("No such task!");
    await task.destroy();
    res.send({ message: "deleted successfully" });
  } catch (e) {
    next();
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
