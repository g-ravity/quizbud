import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import adminStyle from "./css/Admin.module.css";
import Loader from "../components/Loader";
import { adminLogin, checkAdminAuth } from "../actions";

const AdminScreen = ({ adminLogin, checkAdminAuth, admin, history }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (admin === null) checkAdminAuth();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (admin) history.push("/admin/dashboard");
		// eslint-disable-next-line
	}, [admin]);

	const onFormSubmit = event => {
		event.preventDefault();
		adminLogin(username, password);
	};

	return admin === null ? (
		<Loader />
	) : (
		<div>
			<p className={adminStyle.header}>Welcome to QuizBud Admin Panel</p>
			<form className={adminStyle.form} onSubmit={onFormSubmit}>
				<div>
					<label>
						<i className={`far fa-user ${adminStyle.icon}`}></i>
					</label>
					<input
						type="text"
						placeholder="Username"
						required
						onChange={event => setUsername(event.target.value)}
						value={username}
					/>
				</div>
				<div>
					<label>
						<i className={`fas fa-lock ${adminStyle.icon}`}></i>
					</label>
					<input
						type="password"
						placeholder="Password"
						required
						pattern=".{8,}"
						title="Must contain at least 8 or more characters"
						onChange={event => setPassword(event.target.value)}
						value={password}
					/>
				</div>
				<input type="submit" value="Log In" className={adminStyle.login} />
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return { admin: state.admin };
};

export default connect(mapStateToProps, { adminLogin, checkAdminAuth })(AdminScreen);
