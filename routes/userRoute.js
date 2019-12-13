const express = require("express");

const router = express.Router();
const User = require("../models/User");
const Player = require("../models/Player");

router.get("/", async (req, res) => {
	if (req.session.id) {
		const user = await User.findById(req.session.id);
		if (user) return res.status(200).send(user.userId);
		return res.status(400).send("User doesn't exist");
	}
	return res.status(400).send("User not registered");
});

router.post("/", async (req, res) => {
	let user = new User({
		name: req.body.name,
		quiz: req.body.quiz
	});
	user = await user.save();
	req.session.id = user.id;
	return res.status(200).send(user.userId);
});

router.get("/:userId", async (req, res) => {
	if (req.session.id) {
		const user = await User.findById(req.session.id);
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
