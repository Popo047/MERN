const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Comments = sequelize.define("comments", {
	commentBody: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = Comments;
