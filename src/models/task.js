const { DataTypes, sequelize } = require("../Database/connection");
const User = require("./user");

const Task = sequelize.define("task", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    required: true,
  },
  description: {
    type: DataTypes.STRING,
    required: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    default: false,
    required: true,
  },
});

// For belongsTo, the foreign key is the key in the task model that references a key in the user model
Task.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = Task;
