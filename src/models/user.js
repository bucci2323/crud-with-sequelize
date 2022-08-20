


// const Sequelize = require("sequelize");

// module.exports = sequelize.define("Users", {
// id: {
//     type: Sequelize.INTEGER(11),
//     allowNull:false,
//     autoIncrement: true,
//     primaryKey: true

// },

//     content: Sequelize.STRING(300)
// });

// //////////////////////////////////////

const sequelize = require("../Database/connection");

const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");
const Sequelize = require("sequelize");

const User = (module.exports = sequelize.define(
  "users",
  {
    name: {
      type: Sequelize.STRING(20),
      required: true,
      trim: true,
    },
    email: {
      type: Sequelize.STRING(),
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw Error("email is invalid");
      //   }
      // },
    },
    password: {
      type: Sequelize.STRING(20),
      required: true,
      trim: true,
      minlength: 6,
      // validate(value) {
      //   if (value.toLowerCase().includes("password")) {
      //     throw new Error('Passwords cannot contain "password"');
      //   }
      // },
    },
    passcode: {
      type: Sequelize.STRING(4),
      required: true,
      trim: true,
      minlength: 4,
    },

    // token: {
    //   type: Sequelize.STRING(),
    //   required: true,
    // },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }
  // {
  //   timestamps: true,
  // }
));

// userSchema.virtual("tasks", {
//   ref: "Task",
//   localField: "_id",
//   foreignField: "owner",
// });

// Hash the plain text before saving
// userSchema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });
// delete user task when user is removed
// userSchema.pre("remove", async function (next) {
//   const user = this;
//   Task.destroy({where: { owner: user._id }});

//   next();
// });

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.passcode;

//   return userObject;
// };
// const User = userSchema
// const User = Model("Users", userSchema);

module.exports = User;
