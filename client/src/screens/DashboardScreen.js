import React, { useEffect } from "react";
import { connect } from "react-redux";

import { adminLogout } from "../actions";

const DashboardScreen = ({ adminLogout, admin, history }) => {
	useEffect(() => {
		if (!admin) history.push("/admin");
		// eslint-disable-next-line
	}, [admin]);

	return <button onClick={adminLogout}>Log Out</button>;
};

const mapStateToProps = state => {
	return { admin: state.admin };
};

export default connect(mapStateToProps, { adminLogout })(DashboardScreen);
