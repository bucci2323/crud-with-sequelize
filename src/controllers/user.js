const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const errorHandler = require("../middleware/errorhandler");

const mySchema = Joi.object().keys({
  passcode: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

// create user
const signUp = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET);

    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log("err is ", e);
    res.status(400).send(e);
  }
};

// sign in   ////////
const signIn = async (req, res) => {
  try {
    const { error, value } = mySchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await User.findOne({ where: { email: value.email } });

    if (!user || user.passcode !== value.passcode) {
      throw new Error("unable to login!!");
    }

    // const isMatch = await bcrypt.compare(value.password, user.password);
    // if (!isMatch) {
    //   throw new Error("Unable to login");
    // }

    const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET);

    await user.save();

    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

//   update user ////

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "passcode"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: " Invalid Updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

//   get users/////
const getUser = async (req, res) => {
  res.send(req.user);
};

const deleteUser =  async (req, res) => {
    try {
      await req.user.destroy();
      res.send(req.user);
    } catch (e) {
      res.status(500).send(e);
      console.log("this is my rrr ", e);
    }
  }
module.exports = { signUp, signIn, updateUser, getUser , deleteUser };
