// module.exports = async () => {
//   // const Tweet = require("./models/Tweet");
//   const User = require("./models/user");
//   const sequelize = require("./database/connection");

//   User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
//   Tweet.belongsTo(User, { as: "Users", foreignKey: "userId" });

//   const errHandler = (err) => {
//     console.log("Error", err);
//   };

//   const user = await User.create({
//     username: "vicmar",
//     passwd: "1234567890",
//   }).catch(errHandler);

//   const tweet = await Tweet.create({
//     content: "This is a tweet from my phone ",
//   }).catch(errHandler);

//   const users = await User.findAll({
//     where: { username: "vicmar" }
//     // include: [{ model: Tweet, as: "Tweets" }],
//   }).catch(errHandler);

//   console.log("VicMar Tweets : ", users , "guy");
// };
