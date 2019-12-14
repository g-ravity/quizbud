const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();
const Admin = require("../models/admin");

router.post("/", async (req, res) => {
	const { username, password } = req.body;
	if (username && password.length >= 8) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			let admin = new Admin({
				username,
				password: hashedPassword
			});
			admin = await admin.save();
			return res.status(200).send(admin.username);
		} catch (err) {
			return res.status(400).send("Something went wrong");
		}
	}
	return res.status(400).send("Invalid username or password");
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (username && password.length >= 8) {
		try {
			const admin = await Admin.findOne({ username });
			if (admin) {
				const result = await bcrypt.compare(password, admin.password);
				if (result) {
					const token = admin.generateAuthToken();
					req.session.authToken = token;
					return res.status(200).send(admin.username);
				}
				return res.status(400).send("Incorrect Password");
			}
			return res.status(400).send("Incorrect Username");
		} catch (err) {
			return res.status(400).send("Something went wrong");
		}
	}
	return res.status(400).send("Invalid username or password");
});

router.get("/", async (req, res) => {
	if (req.session.authToken) {
		try {
			const token = jwt.verify(req.session.authToken, config.get("jwtPrivateKey"));
			const admin = await Admin.findById(token.id);
			return res.status(200).send(admin.username);
		} catch (err) {
			return res.status(400).send("Invalid Token");
		}
	}
	return res.status(400).send("Token Missing");
});

router.get("/logout", (req, res) => {
	req.session.authToken = null;
	return res.status(200).send("Logged Out");
});

module.exports = router;
