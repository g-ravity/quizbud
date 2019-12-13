import axios from "axios";

const baseURL =
	process.env.NODE_ENV === "production" ? "https://quizbud.herokuapp.com" : "http://localhost:3000";

export default axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" }
});
