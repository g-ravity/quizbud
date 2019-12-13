const mongoose = require("mongoose");
const shortid = require("shortid");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	quiz: {
		type: [
			{
				questionId: mongoose.Schema.Types.ObjectId,
				answer: String
			}
		]
	},
	userId: { type: String, default: shortid.generate, unique: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
