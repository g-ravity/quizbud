import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import homeStyle from "./css/Home.module.css";
import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import { registerUser, checkRegistration } from "../actions";

const HomeScreen = ({
  registerUser,
  checkRegistration,
  isRegistered,
  history
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    checkRegistration();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isRegistered) history.push("/quiz");
    // eslint-disable-next-line
  }, [isRegistered]);

  const onInputSubmit = () => {
    registerUser(name);
  };

  return (
    <Showcase>
      {isRegistered === false ? (
        <>
          <div className={homeStyle.input}>
            <p>What's Your Name?</p>
            <input
              type="text"
              className={homeStyle.nameInput}
              placeholder="Enter Your Name"
              onChange={event => {
                setName(event.target.value);
              }}
              value={name}
            />
          </div>
          <button className={homeStyle.button} onClick={onInputSubmit}>
            Next
          </button>
        </>
      ) : (
        <Loader />
      )}
    </Showcase>
  );
};

const mapStateToProps = state => {
  return {
    isRegistered: state.isRegistered
  };
};

export default connect(mapStateToProps, { registerUser, checkRegistration })(
  HomeScreen
);
