const { DataTypes, sequelize } = require("../Database/connection");

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    required: true,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    trim: true,
    minlength: 6,
  },
  passcode: {
    type: DataTypes.STRING,
    required: true,
    trim: true,
    minlength: 4,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = User;
