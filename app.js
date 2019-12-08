const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const User = require("./models/user");

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

app.post("/api/user", async (req, res) => {
  if (req.session.id) return res.status(400).send("Already registered");
  let user = new User({
    name: req.body.name
  });
  user = await user.save();
  req.session.id = user.id;
  return res.status(200).send("User registered successfully");
});
