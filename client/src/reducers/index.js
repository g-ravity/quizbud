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

const userReducer = (state = { name: "", quiz: [] }, action) => {
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
    default:
      return state;
  }
};

export default combineReducers({
  userId: authReducer,
  questions: quizReducer,
  user: userReducer,
  player: playerReducer
});
