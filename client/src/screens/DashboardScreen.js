import React, { useEffect } from "react";
import { connect } from "react-redux";

import Loader from "../components/Loader";
import dashboardStyle from "./css/Dashboard.module.css";
import { adminLogout, getQuestions, checkAdminAuth } from "../actions";

const DashboardScreen = ({ adminLogout, admin, history, getQuestions, checkAdminAuth }) => {
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

	return !admin ? (
		<Loader />
	) : (
		<>
			<div className={dashboardStyle.header}>
				<h1>Admin Dashboard</h1>
				<p className={dashboardStyle.profile}>Hello, {admin}</p>
			</div>
			<div className={dashboardStyle.questionList}>
				<div className={dashboardStyle.questionGroup}>
					<p className={dashboardStyle.question}>What is my name?</p>
					<div className={dashboardStyle.optionsGroup}>
						<div>Ravik</div>
						<div>Pranab</div>
						<div>Anish</div>
						<div>Tushar</div>
					</div>
				</div>
				<div className={dashboardStyle.questionGroup}>
					<p className={dashboardStyle.question}>What is my name?</p>
					<div className={dashboardStyle.optionsGroup}>
						<div>Ravik</div>
						<div>Pranab</div>
						<div>Anish</div>
						<div>Tushar</div>
					</div>
				</div>
				<div className={dashboardStyle.questionGroup}>
					<p className={dashboardStyle.question}>What is my name?</p>
					<div className={dashboardStyle.optionsGroup}>
						<div>Ravik</div>
						<div>Pranab</div>
						<div>Anish</div>
						<div>Tushar</div>
					</div>
				</div>
				<div className={dashboardStyle.questionGroup}>
					<p className={dashboardStyle.question}>What is my name?</p>
					<div className={dashboardStyle.optionsGroup}>
						<div>Ravik</div>
						<div>Pranab</div>
						<div>Anish</div>
						<div>Tushar</div>
					</div>
				</div>
			</div>
			<div className={dashboardStyle.buttonGroup}>
				<i className={`fas fa-plus ${dashboardStyle.button} ${dashboardStyle.add}`}></i>
				<i
					className={`fas fa-power-off ${dashboardStyle.button} ${dashboardStyle.logout}`}
					onClick={adminLogout}
				></i>
			</div>
		</>
	);
};

const mapStateToProps = state => {
	return { admin: state.admin };
};

export default connect(mapStateToProps, { adminLogout, getQuestions, checkAdminAuth })(
	DashboardScreen
);
