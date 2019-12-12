import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import Question from "../components/Question";
import Modal from "../components/Modal";
import { getQuestions, submitAnswer, submitUserData } from "../actions";

const QuizScreen = ({
  getQuestions,
  submitAnswer,
  submitUserData,
  questionsArr,
  userId
}) => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (questionsArr && questionsArr.length) setLoading(false);
  }, [questionsArr]);

  const onChoiceSubmit = (questionId, answer) => {
    submitAnswer(questionId, answer);
    if (currentQuestion === questionsArr.length - 1) submitUserData();
    else setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <Showcase>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Question
            questionObj={questionsArr[currentQuestion]}
            qno={currentQuestion + 1}
            totalQuestions={questionsArr.length}
            onChoiceSubmit={onChoiceSubmit}
            isPlayer={false}
          />
          {userId ? <Modal userId={userId} /> : null}
        </>
      )}
    </Showcase>
  );
};

const mapStateToProps = state => {
  return { questionsArr: state.questions, userId: state.userId };
};

export default connect(mapStateToProps, {
  getQuestions,
  submitAnswer,
  submitUserData
})(QuizScreen);
