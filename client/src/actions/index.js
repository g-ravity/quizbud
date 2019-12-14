import axiosApi from "../apis";

export const registerUser = name => {
	return {
		type: "REGISTER_USER",
		payload: name
	};
};

export const submitUserData = user => {
	return async (dispatch, getState) => {
		const { user } = getState();
		try {
			const response = await axiosApi.post("/api/user", { name: user.name, quiz: user.quiz });
			dispatch({
				type: "USER_REGISTERED",
				payload: response.data
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const checkRegistration = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axiosApi.get("/api/user");
			dispatch({
				type: "USER_REGISTERED",
				payload: response.data
			});
		} catch (err) {
			dispatch({
				type: "USER_NOT_REGISTERED"
			});
		}
	};
};

export const getQuestions = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axiosApi.get("/api/question");
			dispatch({
				type: "QUESTIONS",
				payload: response.data
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const submitQuestion = (question, options) => {
	return async (dispatch, getState) => {
		try {
			const response = await axiosApi.post("/api/question", { question, options });
			dispatch({
				type: "QUESTION_SUBMITTED",
				payload: response.data
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const submitAnswer = (questionId, answer) => {
	return {
		type: "SUBMIT_ANSWER",
		payload: {
			questionId,
			answer
		}
	};
};

export const storeUserData = user => {
	return {
		type: "USER_DATA",
		payload: user
	};
};

export const registerPlayer = name => {
	return {
		type: "REGISTER_PLAYER",
		payload: name
	};
};

export const updatePlayerScore = () => {
	return {
		type: "UPDATE_SCORE"
	};
};

export const submitPlayerData = () => {
	return async (dispatch, getState) => {
		const { user, player } = getState();
		try {
			const response = await axiosApi.post("/api/player", {
				userId: user.userId,
				name: player.name,
				score: player.score
			});
			dispatch({
				type: "PLAYER_DATA",
				payload: response.data
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const getResults = () => {
	return async (dispatch, getState) => {
		const { user } = getState();
		try {
			const response = await axiosApi.get(`/api/user/${user.userId}/results`);
			dispatch({
				type: "USER_RESULTS",
				payload: response.data
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const adminLogin = (username, password) => {
	return async (dispatch, getState) => {
		try {
			const response = await axiosApi.post("/api/admin/login", { username, password });
			dispatch({
				type: "ADMIN_LOGGED_IN",
				payload: response.data
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const adminLogout = () => {
	return async (dispatch, getState) => {
		try {
			await axiosApi.get("/api/admin/logout");
			dispatch({
				type: "ADMIN_LOGGED_OUT"
			});
		} catch (err) {
			console.log("Something went wrong!");
		}
	};
};

export const checkAdminAuth = () => {
	return async (dispatch, getState) => {
		try {
			const response = await axiosApi.get("/api/admin");
			dispatch({
				type: "ADMIN_LOGGED_IN",
				payload: response.data
			});
		} catch (err) {
			dispatch({
				type: "ADMIN_LOGGED_OUT"
			});
		}
	};
};
