const Task = require("../models/task");
const Joi = require("joi");
const User = require("../models/user");
const { ValidationError, NotFoundError, FieldRequiredError, UnauthorizedError } = require("../middleware/helper");

const taskSchema = Joi.object().keys({
  description: Joi.string().required(),
  status: Joi.string(),
  level: Joi.string(),
  passcode: Joi.string().required(),
});

const createTask = async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) throw new FieldRequiredError(`my error!!!`);
    const task = new Task({
      ...value,
      user_id: req.user.id, jjnni
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

const updateTask = async (req, res, next) => {
  // const updates = Object.keys(req.body);
  // allowedUpdates = ["description", "status", "passcode"];
  // const isValidOperation = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );
  // if (!isValidOperation) throw new ValidationError("invalid updates");
  // try {
  //   const task = await Task.findOne({
  //     id: req.params.id,
  //     user_id: req.user.id,
  //   });

  //   if (!task) throw new NotFoundError("No task");

  //   updates.forEach((update) => (task[update] = req.body[update]));
  //   await task.save();
  //   res.send(task);
  // } catch (e) {
  //   res.status(400).send(e);
  // }
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const {
      user: { password },
      user,
    } = req.body;

    Object.entries(user).forEach((entry) => {
      const [key, value] = entry;

      if (value !== undefined && key !== "password") loggedUser[key] = value;
    });

    if (password !== undefined || password !== "") {
      loggedUser.password = await (password);
    }

    await loggedUser.save();

    res.json({ user: loggedUser });
  } catch (error) {
    next(error);
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
