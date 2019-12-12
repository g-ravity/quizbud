import React, { useState } from "react";

import questionStyle from "./css/Question.module.css";

const Question = ({
  questionObj,
  qno,
  totalQuestions,
  onChoiceSubmit,
  isPlayer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const highlightOption = event => {
    if (!isPlayer) {
      if (event.target.classList.contains(`${questionStyle.correctOption}`))
        setSelectedAnswer(null);
      else setSelectedAnswer(event.target.innerText);
      event.target.classList.toggle(`${questionStyle.correctOption}`);
    } else {
      setSelectedAnswer(event.target.innerText);
      if (event.target.innerText === questionObj.answer)
        event.target.classList.add(`${questionStyle.correctOption}`);
      else event.target.classList.add(`${questionStyle.wrongOption}`);
    }
  };

  const renderOptions = () => {
    return questionObj.options.map(cur => (
      <div
        key={cur}
        onClick={event => highlightOption(event)}
        className={
          selectedAnswer && cur === questionObj.answer
            ? questionStyle.correctOption
            : ""
        }
      >
        {cur}
      </div>
    ));
  };

  return (
    <>
      <div className={questionStyle.questionGroup}>
        <p className={questionStyle.question}>{questionObj.question}</p>
        <div className={questionStyle.options}>{renderOptions()}</div>
      </div>
      <button
        className={questionStyle.button}
        onClick={() => {
          onChoiceSubmit(questionObj._id, selectedAnswer);
          setSelectedAnswer(null);
        }}
      >
        Next
      </button>
      <div className={questionStyle.questionNumber}>
        {qno < 10 ? `0${qno}` : `${qno}`}
        <span className={questionStyle.totalQuestions}>
          /&nbsp;{totalQuestions}
        </span>
      </div>
    </>
  );
};

export default Question;
