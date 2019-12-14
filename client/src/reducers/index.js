import { combineReducers } from "redux";

const authReducer = (state = null, action) => {
	switch (action.type) {
		case "USER_REGISTERED":
			return action.payload;
		case "USER_NOT_REGISTERED":
			return false;
		default:
			return state;
	}
};

const userReducer = (state = { name: "", quiz: [], results: null }, action) => {
	switch (action.type) {
		case "REGISTER_USER":
			return { ...state, name: action.payload };
		case "SUBMIT_ANSWER": {
			let quiz = [
				...state.quiz,
				{
					questionId: action.payload.questionId,
					answer: action.payload.answer
				}
			];
			return { ...state, quiz };
		}
		case "USER_DATA": {
			const { name, quiz, userId } = action.payload;
			return { name, quiz, userId };
		}
		case "USER_RESULTS":
			return { ...state, results: action.payload };
		default:
			return state;
	}
};

const playerReducer = (state = { name: "", score: 0 }, action) => {
	switch (action.type) {
		case "REGISTER_PLAYER":
			return { ...state, name: action.payload };
		case "UPDATE_SCORE":
			return { ...state, score: state.score + 1 };
		case "PLAYER_DATA": {
			const { userId, name, score } = action.payload;
			return { userId, name, score };
		}
		default:
			return state;
	}
};

const quizReducer = (state = [], action) => {
	switch (action.type) {
		case "QUESTIONS":
			return action.payload;
		case "QUESTION_SUBMIT":
			return [...state, action.payload];
		case "QUESTION_DELETE":
			return state.filter(cur => cur._id !== action.payload._id);
		default:
			return state;
	}
};

const adminReducer = (state = null, action) => {
	switch (action.type) {
		case "ADMIN_LOGGED_IN":
			return action.payload;
		case "ADMIN_LOGGED_OUT":
			return false;
		default:
			return state;
	}
};

export default combineReducers({
	userId: authReducer,
	questions: quizReducer,
	user: userReducer,
	player: playerReducer,
	admin: adminReducer
});
