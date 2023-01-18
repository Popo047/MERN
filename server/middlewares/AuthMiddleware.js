const { verify } = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
	console.log("Validating");

	const accessToken = req.header("accessToken");
	if (!accessToken) return res.sendStatus(403);

	try {
		const validToken = verify(accessToken, "importantSecret");
		req.user = validToken;
		if (validToken) next();
	} catch (error) {
		return res.status(403).json(error);
	}
};

module.exports = validateToken;
