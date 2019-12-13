const express = require("express");

const router = express.Router();
const Player = require("../models/player");

router.post("/", async (req, res) => {
	let player = new Player({
		userId: req.body.userId,
		name: req.body.name,
		score: req.body.score
	});
	try {
		player = await player.save();
		return res.status(200).send(player);
	} catch (err) {
		return res.status(400).send("Something went wrong");
	}
});

module.exports = router;
