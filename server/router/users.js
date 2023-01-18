const { Router } = require("express");
const Users = require("../models/users");
const router = Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

// router.get("/", async (req, res) => {
// 	const posts = await Posts.findAll();
// 	res.status(200).json({ posts });
// });

// router.get("/:id", async (req, res) => {
// 	const { id } = req.params;
// 	try {
// 		const { dataValues } = await Posts.findByPk(id);
// 		if (dataValues) res.status(200).json(dataValues);
// 	} catch (error) {
// 		res.status(404).send({ message: "Not Found" });
// 	}
// });

router.post("/signin", async (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		const User = await Users.findOne({ where: { username } });
		if (!User) {
			res.sendStatus(404);
			return;
		}
		const match = await bcrypt.compare(password, User?.dataValues?.password);
		if (match) {
			const accessToken = sign(
				{ username: User.username, id: User.id },
				"importantSecret"
			);
			res.status(200).json({ message: "Logged In", accessToken });
		} else res.sendStatus(400);
	} else res.status(400).json({ message: "Wrong Input" });
});

router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		const hashedPassWord = await bcrypt.hash(password, 10);
		const { dataValues } = await Users.create({
			username,
			password: hashedPassWord,
		});
		res.status(200).json({ message: "User Created" });
	} else res.status(400).json({ message: "Bad Request" });
});

module.exports = router;
