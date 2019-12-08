import React, { useState } from "react";

import homeStyle from "./css/Home.module.css";
import Showcase from "../components/Showcase";

const HomeScreen = () => {
  const [name, setName] = useState("");

  const onInputSubmit = async () => {
    const params = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ name: name })
    };

    try {
      await fetch("/api/user", params);
    } catch (err) {
      console.log("Something went wrong!");
    }
  };

  return (
    <Showcase>
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
    </Showcase>
  );
};

export default HomeScreen;
