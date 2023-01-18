const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Posts = require("./posts");

const Users = sequelize.define("users", {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

Users.hasMany(Posts);

module.exports = Users;
