import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/quiz" exact component={QuizScreen} />
    </BrowserRouter>
  );
};

export default App;
