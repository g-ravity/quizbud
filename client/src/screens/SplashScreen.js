import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Showcase from "../components/Showcase";
import Loader from "../components/Loader";
import PlayerScreen from "./PlayerScreen";
import ResultScreen from "./ResultScreen";
import { storeUserData } from "../actions";

const SplashScreen = props => {
  const [loading, setLoading] = useState(true);
  const [isPlayer, setPlayer] = useState(null);

  const checkForCookie = async () => {
    const response = await fetch(`/api/user/${props.match.params.userId}`);
    const data = await response.json();
    props.storeUserData(data.userData);
    if (data.isPlayer) setPlayer(true);
    else setPlayer(false);
    setLoading(false);
  };

  useEffect(() => {
    checkForCookie();
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
