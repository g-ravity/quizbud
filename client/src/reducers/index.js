import { combineReducers } from "redux";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "USER_REGISTERED":
      return true;
    case "USER_NOT_REGISTERED":
      return false;
    default:
      return state;
  }
};

const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case "QUESTIONS":
      return { ...state, questionsArr: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  isRegistered: authReducer,
  quiz: quizReducer
});
