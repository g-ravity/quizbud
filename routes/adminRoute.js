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
					return res.status(200).send({
						token,
						username: admin.username
					});
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
	if (req.headers.authorization) {
		try {
			const token = jwt.verify(req.headers.authorization, config.get("jwtPrivateKey"));
			const admin = await Admin.findById(token.id);
			if (admin) return res.status(200).send(admin.username);
			return res.status(400).send("Admin not found");
		} catch (err) {
			return res.status(400).send("Invalid Token");
		}
	}
	return res.status(400).send("No credentials sent");
});

module.exports = router;
