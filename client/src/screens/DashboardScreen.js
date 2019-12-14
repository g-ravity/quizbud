import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Option from "../components/Option";
import dashboardStyle from "./css/Dashboard.module.css";
import {
	adminLogout,
	getQuestions,
	checkAdminAuth,
	submitQuestion,
	deleteQuestion
} from "../actions";

const DashboardScreen = ({
	adminLogout,
	admin,
	questionsArr,
	history,
	getQuestions,
	checkAdminAuth,
	submitQuestion,
	deleteQuestion
}) => {
	const [showModal, setShowModal] = useState(false);
	const [questionObj, setQuestionObj] = useState({ question: "", options: {} });
	useEffect(() => {
		if (admin === null) checkAdminAuth();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (admin !== null) {
			if (admin === false) history.push("/admin");
			else getQuestions();
		}
		// eslint-disable-next-line
	}, [admin]);

	const onInputChange = (id, value) => {
		const options = { ...questionObj.options, [id]: value };
		setQuestionObj({ ...questionObj, options });
	};

	const onQuestionSubmit = () => {
		const options = [];
		for (const key in questionObj.options) options.push(questionObj.options[key]);
		options.sort();
		submitQuestion(questionObj.question, options);
		setQuestionObj({ question: "", options: {} });
	};

	const renderQuestions = () => {
		const questions = [...questionsArr];
		return questions.reverse().map(cur => (
			<div
				key={cur._id}
				className={dashboardStyle.questionGroup}
				onClick={() => deleteQuestion(cur._id)}
			>
				<i className={`fas fa-trash ${dashboardStyle.delete}`}></i>
				<div className={dashboardStyle.questionContainer}>
					<p className={dashboardStyle.question}>{cur.question}</p>
					<div className={dashboardStyle.optionsGroup}>
						{cur.options.map(option => (
							<div key={option}>{option}</div>
						))}
					</div>
				</div>
			</div>
		));
	};

	return !admin ? (
		<Loader />
	) : showModal ? (
		<Modal>
			<h1 style={{ color: "#85a1ff" }}>Add Question</h1>
			<div>
				<textarea
					type="text"
					placeholder="Question"
					className={dashboardStyle.questionInput}
					onChange={event => setQuestionObj({ ...questionObj, question: event.target.value })}
					value={questionObj.question}
				/>
				<Option onInputChange={onInputChange} />
				<Option onInputChange={onInputChange} />
				<Option onInputChange={onInputChange} />
				<Option onInputChange={onInputChange} />
			</div>
			<i
				className={`fas fa-plus ${dashboardStyle.button} ${dashboardStyle.add}`}
				style={{ position: "absolute", bottom: "20px", right: "20px" }}
				onClick={() => {
					onQuestionSubmit();
					setShowModal(false);
				}}
			></i>
		</Modal>
	) : (
		<>
			<div className={dashboardStyle.header}>
				<h1>Admin Dashboard</h1>
				<p className={dashboardStyle.profile}>Hello, {admin}</p>
			</div>
			<div className={dashboardStyle.questionList}>
				{questionsArr.length ? renderQuestions() : <Loader />}
			</div>
			<div className={dashboardStyle.buttonGroup}>
				<i
					className={`fas fa-plus ${dashboardStyle.button} ${dashboardStyle.add}`}
					onClick={() => setShowModal(true)}
				></i>
				<i
					className={`fas fa-power-off ${dashboardStyle.button} ${dashboardStyle.logout}`}
					onClick={adminLogout}
				></i>
			</div>
		</>
	);
};

const mapStateToProps = state => {
	return { admin: state.admin, questionsArr: state.questions };
};

export default connect(mapStateToProps, {
	adminLogout,
	getQuestions,
	checkAdminAuth,
	submitQuestion,
	deleteQuestion
})(DashboardScreen);
