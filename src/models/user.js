


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
    
    },
    password: {
      type: Sequelize.STRING(20),
      required: true,
      trim: true,
      minlength: 6,
    },
    passcode: {
      type: Sequelize.STRING(4),
      required: true,
      trim: true,
      minlength: 4,
    },

   
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }
  
));



module.exports = User;
