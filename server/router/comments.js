const { Router } = require("express");
const router = Router();
const Comments = require("../models/comments");

router.get("/:postId", async (req, res) => {
	const { postId } = req.params;
	try {
		const response = await Comments.findAll({ where: { postId } });
		res.status(200).json(response);
	} catch (error) {
		res.sendStatus(400);
		console.log(error);
	}
});

router.post("/:postId", async (req, res) => {
	const { postId } = req.params;
	const { commentBody } = req.body;
	try {
		const { dataValues } = await Comments.create({ commentBody, postId });
		console.log(dataValues);
		res.status(200).json("OK");
	} catch (error) {
		res.sendStatus(400);
		console.log(error);
	}
});

module.exports = router;
