import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import SplashScreen from "../screens/SplashScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/quiz" exact component={QuizScreen} />
      <Route path="/quiz/:userId" exact component={SplashScreen} />
    </BrowserRouter>
  );
};

export default App;
