const express = require("express");
const sequelize = require("./config/database");
const app = express();
const cors = require("cors");

const postsRoute = require("./router/posts");
const commentsRoute = require("./router/comments");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);

sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		// console.log(result);
		app.listen(3000, () => {
			console.log("Server is running on port 3000");
		});
	})
	.catch((err) => {
		console.log(err);
	});
