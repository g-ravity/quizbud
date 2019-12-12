import React, { Component } from "react";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import NameInput from "../components/NameInput";
import Question from "../components/Question";
import {
  registerPlayer,
  getQuestions,
  updatePlayerScore,
  submitPlayerData
} from "../actions";

class PlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuiz: false,
      currentQuestion: 0
    };
    this.questionList = [];
  }

  componentDidUpdate() {
    if (
      this.props.questionsArr &&
      this.props.questionsArr.length &&
      !this.questionList.length
    ) {
      this.mergeQuestionsAndAnswers();
      if (!this.state.showQuiz) this.setState({ showQuiz: true });
    }
  }

  mergeQuestionsAndAnswers = () => {
    for (const question of this.props.questionsArr) {
      for (const answerData of this.props.user.quiz) {
        if (question._id === answerData.questionId) {
          const questionData = { ...question, answer: answerData.answer };
          this.questionList = [...this.questionList, questionData];
        }
      }
    }
  };

  onInputSubmit = name => {
    this.props.registerPlayer(name);
    this.props.getQuestions();
  };

  onChoiceSubmit = (questionId, answer) => {
    if (this.questionList[this.state.currentQuestion].answer === answer)
      this.props.updatePlayerScore();
    if (this.state.currentQuestion === this.questionList.length - 1)
      this.props.submitPlayerData();
    else this.setState({ currentQuestion: this.state.currentQuestion + 1 });
  };

  render() {
    return (
      <Showcase>
        {this.state.showQuiz ? (
          <Question
            questionObj={this.questionList[this.state.currentQuestion]}
            qno={this.state.currentQuestion + 1}
            totalQuestions={this.questionList.length}
            onChoiceSubmit={this.onChoiceSubmit}
            isPlayer={true}
          />
        ) : (
          <NameInput
            header={`How Well Do You Know ${this.props.user.name}?`}
            onInputSubmit={this.onInputSubmit}
          />
        )}
      </Showcase>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsArr: state.questions
  };
};

export default connect(mapStateToProps, {
  registerPlayer,
  getQuestions,
  updatePlayerScore,
  submitPlayerData
})(PlayerScreen);
