const { Router } = require("express");
const Posts = require("../models/posts");
const router = Router();

router.get("/", async (req, res) => {
	const posts = await Posts.findAll();
	res.status(200).json({ posts });
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

router.post("/", async (req, res) => {
	const { title, description, username } = req.body;

	if (title && description && username) {
		const { dataValues } = await Posts.create({ title, description, username });
		res.status(200).json(dataValues);
	} else res.status(400).json({ message: "Bad Request" });
});

module.exports = router;
