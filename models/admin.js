const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const adminSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

adminSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ id: this.id }, config.get("jwtPrivateKey"), { expiresIn: "1d" });
	return token;
};

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
