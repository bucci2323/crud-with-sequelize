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

Task.associate = function(models) {
  Task.belongsTo(models.User, {foreignKey: 'owner', as: 'owner'})
};

module.exports = Task;
