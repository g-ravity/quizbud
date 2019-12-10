const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const User = require("./models/user");
const Question = require("./models/question");

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

app.get("/api/user", async (req, res) => {
  if (req.session.id) return res.status(200).send("Already registered");
  return res.status(400).send("User not registered");
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

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find({});
    return res.status(200).send(questions);
  } catch (err) {
    return res.status(400).send("Error occurred while feteching data!");
  }
});

app.post("/api/questions", async (req, res) => {
  let question = new Question({
    question: req.body.question,
    options: req.body.options
  });
  question = await question.save();
  res.status(200).send("Question successfully submitted");
});

app.post("/api/user/quiz", async (req, res) => {
  if (!req.session.id) return res.status(400).send("User not found");
  else {
    try {
      let user = await User.findById(req.session.id);
      user.set({
        quiz: [
          ...user.quiz,
          { questionId: req.body.questionId, answer: req.body.answer }
        ]
      });
      user = await user.save();
      return res.status(200).send("Answer stored successfully");
    } catch (err) {
      return res.status(400).send("Some error occurred");
    }
  }
});
