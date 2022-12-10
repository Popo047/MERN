const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("posts", "root", "Abepopo007!", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
