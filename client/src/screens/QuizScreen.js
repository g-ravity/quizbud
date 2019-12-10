import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import quizStyle from "./css/Quiz.module.css";
import { getQuestions } from "../actions";

const QuizScreen = ({ getQuestions, questionsArr }) => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (questionsArr && questionsArr.length) setLoading(false);
  }, [questionsArr]);

  const onChoiceSubmit = async event => {
    const params = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        questionId: questionsArr[currentQuestion]._id,
        answer: event.target.innerText
      })
    };
    const response = await fetch("/api/user/quiz", params);
    if (response.status === 200) setCurrentQuestion(currentQuestion + 1);
  };

  const renderOptions = () => {
    return questionsArr[currentQuestion].options.map(cur => (
      <div key={cur} onClick={onChoiceSubmit}>
        {cur}
      </div>
    ));
  };

  return (
    <Showcase>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={quizStyle.questionGroup}>
            <p className={quizStyle.question}>
              {questionsArr[currentQuestion].question}
            </p>
            <div className={quizStyle.options}>{renderOptions()}</div>
          </div>
          <div className={quizStyle.questionNumber}>
            {currentQuestion < 9
              ? `0${currentQuestion + 1}`
              : `${currentQuestion + 1}`}
            <span className={quizStyle.totalQuestions}>
              /&nbsp;{questionsArr.length}
            </span>
          </div>
        </>
      )}
    </Showcase>
  );
};

const mapStateToProps = state => {
  return { questionsArr: state.quiz.questionsArr };
};

export default connect(mapStateToProps, { getQuestions })(QuizScreen);
