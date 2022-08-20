const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();
const Joi = require("joi");
const validator = require("validator");
const userSchema = require("../routers/user");
const passcode = require("../middleware/passcode");

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

router.post("/tasks", auth, passcode, async (req, res) => {
  try {
    const { error, value } = taskSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const task = new Task({
      ...value,
      owner: req.user.id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
router.get("/tasks", auth, async (req, res) => {

        res.send(req.user.task);
    })

// router.get("/tasks", auth, async (req, res) => {
//   const match = {};
//   const sort = {};
//   if (req.query.description) {
//     match.description = req.query.description === "my small description";
//   }

//   try {
//     await req.task.populate({
//       path: "tasks",
//       match,
//       options: {
//         // limit: parseInt(req.query.limit),
//         // skip: parseInt(req.query.skip),
//         // sort,
//       },
//     });

    

//   res.send(req.user.task);
//   } catch (e) {
//     res.status(500).send(e);
//     console.log('error is' , e)
//   }

// });

router.patch("/tasks/:id", auth, passcode, async (req, res) => {
  const updates = Object.keys(req.body);
  allowedUpdates = ["description", "level", "status", "passcode"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({
      id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});



router.delete("/taskse/:id", auth, passcode, async (req, res) => {
    try {
      const task = await task.destroy({ where:{
 id: req.body.id,
      },
       truncate: true
      }
      );
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.delete("/tasks/:id", auth, passcode, async (req, res) => {
    try {
      await req.task.destroy()
      res.send(req.task);
    } catch (e) {
      res.status(500).send(e);
      console.log("this is my rrr ", e);
    }
  });






module.exports = router;
