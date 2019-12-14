import React from "react";
import ReactDOM from "react-dom";

import modalStyle from "./css/Modal.module.css";

const Modal = ({ children }) => {
	return ReactDOM.createPortal(
		<div className={modalStyle.modalContainer}>
			<div className={modalStyle.modalBackground}>{children}</div>
		</div>,
		document.querySelector("#modal")
	);
};

export default Modal;
