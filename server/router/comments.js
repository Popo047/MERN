const { Router } = require("express");
const validateToken = require("../middlewares/AuthMiddleware");
const router = Router();
const Comments = require("../models/comments");

router.get("/:postId", validateToken, async (req, res) => {
	const { postId } = req.params;

	try {
		const response = await Comments.findAll({ where: { postId } });
		res.status(200).json(response);
	} catch (error) {
		res.sendStatus(400);
		console.log(error);
	}
});

router.post("/:postId", validateToken, async (req, res) => {
	const { postId } = req.params;
	const { commentBody } = req.body;
	const { id: userId } = req.user;
	try {
		const { dataValues } = await Comments.create({
			commentBody,
			postId,
			userId,
		});

		res.status(200).json("OK");
	} catch (error) {
		res.sendStatus(400);
		console.log(error);
	}
});

module.exports = router;
