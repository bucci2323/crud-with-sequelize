const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("joi");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  UnauthorizedError
} = require("../middleware/helper");
const mySchema = Joi.object().keys({
  passcode: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

// create user
const signUp = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const { name, email, passcode, password } = req.body;
    if (!name) throw new FieldRequiredError(`A username`);
    if (!email) throw new FieldRequiredError(`An email`);
    if (!password) throw new FieldRequiredError(`A password`);
    if (!passcode) throw new FieldRequiredError(`A passcode`);
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) throw new AlreadyTakenError("Email", "try logging in");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    await user.save();
    res.status(201).json({ user, token });
  } catch (e) {
    next(e);
  }
};

// sign in   ////////
const signIn = async (req, res, next) => {
  try {
    const { error, value } = mySchema.validate(req.body);
    if (error) throw new FieldRequiredError(`my error!!!`);
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) throw new FieldRequiredError(`unable to login!!!!`);
    if (user.passcode !== value.passcode)
      throw new ValidationError("wrong passcode");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    await user.save();
    res.status(201).json({ user, token });
  } catch (e) {
    next(e);
  }
};

// update user ////
const updateUser = async (req, res, next) => {
 
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "passcode"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) throw new ValidationError("invalid updates");

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    next(e);
  }
};

//   get users/////
const getUser = async (req, res, next) => {
  res.send({
    name: req.user.name,
    email: req.user.email,
  });
  next();
};

const deleteUser = async (req, res, next) => {
  try {
    await req.user.destroy();
    res.send(req.user);
  } catch (e) {
    next(e);
  }
};
module.exports = { signUp, signIn, updateUser, getUser, deleteUser };