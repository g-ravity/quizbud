import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import SplashScreen from "../screens/SplashScreen";
import AdminScreen from "../screens/AdminScreen";
import DashboardScreen from "../screens/DashboardScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={HomeScreen} />
			<Route path="/quiz" exact component={QuizScreen} />
			<Route path="/quiz/:userId" exact component={SplashScreen} />
			<Route path="/admin" exact component={AdminScreen} />
			<Route path="/admin/dashboard" exact component={DashboardScreen} />
		</BrowserRouter>
	);
};

export default App;
