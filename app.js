const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const config = require("config");
const cors = require("cors");

const app = express();
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const playerRoute = require("./routes/playerRoute");
const adminRoute = require("./routes/adminRoute");

if (!config.get("jwtPrivateKey")) {
	console.log("App Crashed! JWT Private Key not provided");
	process.exit(1);
}

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

mongoose.set("useFindAndModify", false);
mongoose
	.connect(dbConnectionString, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.log("Error while connecting to MongoDB"));

app.use(
	cors({
		origin: "https://quizbud.netlify.com"
	})
);

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("trust proxy", 1);

// Cookie Session Middleware
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		secret: "mySecretKey",
		httpOnly: true,
		secureProxy: true
	})
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on PORT ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/question", questionRoute);
app.use("/api/player", playerRoute);
app.use("/api/admin", adminRoute);
