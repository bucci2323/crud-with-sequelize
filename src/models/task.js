const sequelize = require("../Database/connection");
const Sequelize = require("sequelize");

const Task = (module.exports = sequelize.define("task", {
  description: {
    type: Sequelize.STRING(),
    required: true,
  },
  completed: {
    type: Sequelize.BOOLEAN(),
    default: false,
    required: true
  },
  owner: {
    type: Sequelize.STRING(),
    //   type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}));

module.exports = Task;
