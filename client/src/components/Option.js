import React, { useState } from "react";
import shortid from "shortid";

import optionStyle from "./css/Option.module.css";

const Option = ({ onInputChange }) => {
	const [value, setValue] = useState("");
	const [id] = useState(shortid.generate());
	return (
		<input
			type="text"
			placeholder="Option"
			className={optionStyle.input}
			onChange={event => {
				setValue(event.target.value);
				onInputChange(id, event.target.value);
			}}
			value={value}
		/>
	);
};

export default Option;
