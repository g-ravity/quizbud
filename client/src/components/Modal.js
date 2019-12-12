import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import modalStyle from "./css/Modal.module.css";

const Modal = ({ userId }) => {
  const copyText = event => {
    const link = document.getElementsByClassName("quiz-link")[0];
    link.focus();
    link.select();
    document.execCommand("copy");
    event.target.innerText = "Copied!";
  };

  return ReactDOM.createPortal(
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalBackground}>
        <p className={modalStyle.header}>Your Quiz has been created!</p>
        <div className={modalStyle.linkGroup}>
          <p>Here's your Quiz Link:</p>
          <input
            value={`http://localhost:3000/quiz/${userId}`}
            className="quiz-link"
            readOnly
          />
          <div className={modalStyle.buttonGroup}>
            <button onClick={copyText}>Copy Link</button>
            <button>
              <Link to={`/quiz/${userId}`}>Go to Results</Link>
            </button>
          </div>
        </div>
        <div className={modalStyle.info}>
          <p>Share the above link with your friends</p>
          <p>
            To check your results, visit the above link from this browser only!
          </p>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
