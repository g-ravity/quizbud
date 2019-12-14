import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import Question from "../components/Question";
import Modal from "../components/Modal";
import quizStyle from "./css/Quiz.module.css";
import { getQuestions, submitAnswer, submitUserData } from "../actions";

const QuizScreen = ({ getQuestions, submitAnswer, submitUserData, questionsArr, userId }) => {
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

	const copyText = event => {
		const link = document.getElementsByClassName("quiz-link")[0];
		link.focus();
		link.select();
		document.execCommand("copy");
		event.target.innerText = "Copied!";
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
					{userId ? (
						<Modal>
							<p className={quizStyle.header}>Your Quiz has been created!</p>
							<div className={quizStyle.linkGroup}>
								<p>Here's your Quiz Link:</p>
								<input value={`${window.location.href}/${userId}`} className="quiz-link" readOnly />
								<div className={quizStyle.buttonGroup}>
									<button onClick={copyText}>Copy Link</button>
									<button>
										<Link to={`/quiz/${userId}`}>Go to Results</Link>
									</button>
								</div>
							</div>
							<div className={quizStyle.info}>
								<p>Share the above link with your friends</p>
								<p>To check your results, visit the above link from this browser only!</p>
							</div>
						</Modal>
					) : null}
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
