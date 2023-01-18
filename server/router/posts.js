const { Router } = require("express");
const validateToken = require("../middlewares/AuthMiddleware");
const Posts = require("../models/posts");
const router = Router();

router.get("/", validateToken, async (req, res) => {
	const { id: userId } = req.user;
	try {
		const posts = await Posts.findAll();
		res.status(200).json({ posts });
	} catch (error) {
		console.log("Error", error);
		res.sendStatus(403);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const { dataValues } = await Posts.findByPk(id);
		if (dataValues) res.status(200).json(dataValues);
	} catch (error) {
		res.status(404).send({ message: "Not Found" });
	}
});

router.post("/", validateToken, async (req, res) => {
	const { title, description, username } = req.body;
	const { id: userId } = req.user;
	if (title && description && username) {
		const { dataValues } = await Posts.create({
			title,
			description,
			username,
			userId,
		});
		res.status(200).json(dataValues);
	} else res.status(400).json({ message: "Bad Request" });
});

module.exports = router;
