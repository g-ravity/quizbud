import React, { useEffect } from "react";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import goldAward from "./img/gold.png";
import resultStyle from "./css/Result.module.css";
import { getResults } from "../actions";

const ResultScreen = ({ getResults, user }) => {
	const copyText = event => {
		const link = document.getElementsByClassName("quiz-link")[0];
		link.focus();
		link.select();
		document.execCommand("copy");
		event.target.innerText = "Copied!";
	};

	useEffect(() => {
		getResults();
		// eslint-disable-next-line
	}, []);

	const renderResults = () =>
		user.results.map(cur => (
			<div className={resultStyle.tableRow} key={cur._id}>
				<p>
					<img src={goldAward} width="50" alt="Placeholder" />
				</p>
				<p>{cur.name}</p>
				<p>{cur.score}</p>
			</div>
		));

	return (
		<Showcase>
			{!user.results ? (
				<Loader />
			) : (
				<div className={resultStyle.table}>
					<div className={resultStyle.tableHeader}>
						<p>Award</p>
						<p>Name</p>
						<p>Score</p>
					</div>
					{renderResults()}
				</div>
			)}

			<div className={resultStyle.links}>
				<div>
					<p>Your Quiz Link is: </p>
					<input className="quiz-link" value={window.location.href} readOnly />
				</div>
				<button onClick={copyText}>Copy Quiz Link</button>
			</div>
		</Showcase>
	);
};

const mapStateToProps = state => {
	return { user: state.user };
};

export default connect(mapStateToProps, { getResults })(ResultScreen);
