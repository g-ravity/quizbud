import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axiosApi from "../apis";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import PlayerScreen from "./PlayerScreen";
import ResultScreen from "./ResultScreen";
import { storeUserData } from "../actions";

const SplashScreen = props => {
	const [loading, setLoading] = useState(true);
	const [isPlayer, setPlayer] = useState(null);

	const checkForToken = async () => {
		const { data } = await axiosApi.get(`/api/user/${props.match.params.userId}`, {
			headers: { "x-userid": localStorage.getItem("id") ? localStorage.getItem("id") : "" }
		});
		props.storeUserData(data.userData);
		if (data.isPlayer) setPlayer(true);
		else setPlayer(false);
		setLoading(false);
	};

	useEffect(() => {
		checkForToken();
		// eslint-disable-next-line
	}, []);

	return loading ? (
		<Showcase>
			<Loader />
		</Showcase>
	) : isPlayer ? (
		<PlayerScreen user={props.user} />
	) : (
		<ResultScreen />
	);
};

const mapStateToProps = state => {
	return { user: state.user };
};

export default connect(mapStateToProps, { storeUserData })(SplashScreen);
