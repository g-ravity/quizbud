export const registerUser = name => {
  return async (dispatch, getState) => {
    const params = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ name: name })
    };

    try {
      const response = await fetch("/api/user", params);
      if (response.status === 200)
        dispatch({
          type: "USER_REGISTERED"
        });
      else
        dispatch({
          type: "USER_NOT_REGISTERED"
        });
    } catch (err) {
      console.log("Something went wrong!");
    }
  };
};

export const checkRegistration = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("/api/user");
      if (response.status === 200)
        dispatch({
          type: "USER_REGISTERED"
        });
      else
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
