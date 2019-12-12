import React, { useEffect } from "react";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import NameInput from "../components/NameInput";
import { registerUser, checkRegistration } from "../actions";

const HomeScreen = ({
  registerUser,
  checkRegistration,
  userId,
  user,
  history
}) => {
  useEffect(() => {
    checkRegistration();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userId) history.push(`/quiz/${userId}`);
    if (user.name) history.push("/quiz");
    // eslint-disable-next-line
  }, [userId, user]);

  const onInputSubmit = name => {
    registerUser(name);
  };

  return (
    <Showcase>
      {userId === false ? (
        <NameInput header="What's Your Name?" onInputSubmit={onInputSubmit} />
      ) : (
        <Loader />
      )}
    </Showcase>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.userId,
    user: state.user
  };
};

export default connect(mapStateToProps, { registerUser, checkRegistration })(
  HomeScreen
);
