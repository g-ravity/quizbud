const express = require("express");

const router = express.Router();
const User = require("../models/user");
const Player = require("../models/player");

router.get("/", async (req, res) => {
	if (req.headers["x-userid"]) {
		const user = await User.findById(req.headers["x-userid"]);
		if (user) return res.status(200).send(user.userId);
		return res.status(404).send("User doesn't exist");
	}
	return res.status(400).send("User ID not sent");
});

router.post("/", async (req, res) => {
	let user = new User({
		name: req.body.name,
		quiz: req.body.quiz
	});
	user = await user.save();
	return res.status(200).send({
		userId: user.userId,
		id: user.id
	});
});

router.get("/:userId", async (req, res) => {
	if (req.headers["x-userid"]) {
		const user = await User.findById(req.headers["x-userid"]);
		if (user)
			return res.status(200).send({
				isPlayer: false,
				userData: user
			});
		return res.status(400).send("User not found");
	}
	const user = await User.findOne({ userId: req.params.userId });
	if (user)
		return res.status(200).send({
			isPlayer: true,
			userData: user
		});
	return res.status(400).send("User Quiz doesn't exist");
});

router.get("/:userId/results", async (req, res) => {
	try {
		const results = await Player.find({ userId: req.params.userId });
		return res.status(200).send(results);
	} catch (err) {
		return res.status(400).send("Some error occurred");
	}
});

module.exports = router;
