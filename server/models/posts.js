const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Comments = require("./comments");

const Posts = sequelize.define("posts", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

Posts.hasMany(Comments);

module.exports = Posts;
