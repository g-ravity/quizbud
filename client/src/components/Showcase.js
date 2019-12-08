import React from "react";

import showcaseStyle from "./css/Showcase.module.css";
import logo from "./img/logo512.png";

const Showcase = ({ children }) => {
  return (
    <div className={showcaseStyle.showcase}>
      <div className={`${showcaseStyle.navbar} ${showcaseStyle.flexRow}`}>
        <div className={showcaseStyle.flexRow}>
          <img src={logo} alt="QuizBud Logo" className={showcaseStyle.logo} />
          <p>QuizBud</p>
        </div>
        <p>Create, Share and Play Quizzes with your Friends</p>
      </div>
      {children}
    </div>
  );
};

export default Showcase;
