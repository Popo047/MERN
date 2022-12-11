const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Comments = sequelize.define("comments", {
	commentBody: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Comments;
