const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const playerRoute = require("./routes/playerRoute");

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

mongoose
  .connect("mongodb://localhost/quiz_db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error while connecting to MongoDB"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/player", playerRoute);
