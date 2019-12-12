export const registerUser = name => {
  return {
    type: "REGISTER_USER",
    payload: name
  };
};

export const submitUserData = user => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const params = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        quiz: user.quiz
      })
    };
    try {
      const response = await fetch("/api/user", params);
      if (response.status === 200) {
        const userId = await response.text();
        dispatch({
          type: "USER_REGISTERED",
          payload: userId
        });
      }
    } catch (err) {
      console.log("Something went wrong!");
    }
  };
};

export const checkRegistration = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("/api/user");
      if (response.status === 200) {
        const userId = await response.text();
        dispatch({
          type: "USER_REGISTERED",
          payload: userId
        });
      } else
        dispatch({
          type: "USER_NOT_REGISTERED"
        });
    } catch (err) {
      console.log("Something went wrong!");
    }
  };
};

export const getQuestions = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("/api/questions");
      if (response.status === 200) {
        const questions = await response.json();
        dispatch({
          type: "QUESTIONS",
          payload: questions
        });
      }
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
    const params = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId: user.userId,
        name: player.name,
        score: player.score
      })
    };
    try {
      const response = await fetch("/api/player", params);
      if (response.status === 200) {
        const player = await response.json();
        dispatch({
          type: "PLAYER_DATA",
          payload: player
        });
      }
    } catch (err) {
      console.log("Something went wrong!");
    }
  };
};

export const getResults = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    try {
      const response = await fetch(`/api/user/${user.userId}/results`);
      if (response.status === 200) {
        const results = await response.json();
        dispatch({
          type: "USER_RESULTS",
          payload: results
        });
      }
    } catch (err) {
      console.log("Something went wrong!");
    }
  };
};
