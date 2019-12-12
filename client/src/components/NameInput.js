import React, { useState } from "react";

import inputStyle from "./css/NameInput.module.css";

const NameInput = ({ header, onInputSubmit }) => {
  const [name, setName] = useState("");
  return (
    <>
      <div className={inputStyle.input}>
        <p>{header}</p>
        <input
          type="text"
          className={inputStyle.nameInput}
          placeholder="Enter Your Name"
          onChange={event => {
            setName(event.target.value);
          }}
          value={name}
        />
      </div>
      <button className={inputStyle.button} onClick={() => onInputSubmit(name)}>
        Next
      </button>
    </>
  );
};

export default NameInput;
