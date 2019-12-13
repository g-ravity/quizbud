const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const config = require("config");

const app = express();
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const playerRoute = require("./routes/playerRoute");

if (
	process.env.NODE_ENV === "production" &&
	(!config.get("dbUsername") || !config.get("dbPassword"))
) {
	console.log("App Crashed! Environment Variables not provided");
	process.exit(1);
}

const dbConnectionString =
	process.env.NODE_ENV === "production"
		? `mongodb+srv://${config.get("dbUsername")}:${config.get(
				"dbPassword"
		  )}@ravikcluster-aiykj.mongodb.net/test?retryWrites=true&w=majority`
		: "mongodb://localhost/quiz_db";

mongoose
	.connect(dbConnectionString, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.log("Error while connecting to MongoDB"));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Session Middleware
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		secret: "mySecretKey",
		httpOnly: true
	})
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on PORT ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/player", playerRoute);
