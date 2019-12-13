const express = require("express");

const router = express.Router();
const Question = require("../models/question");

router.get("/", async (req, res) => {
	try {
		const questions = await Question.find({});
		return res.status(200).send(questions);
	} catch (err) {
		return res.status(400).send("Error occurred while feteching data!");
	}
});

router.post("/", async (req, res) => {
	let question = new Question({
		question: req.body.question,
		options: req.body.options
	});
	question = await question.save();
	res.status(200).send(question);
});

module.exports = router;
