import React from "react";

import loaderStyle from "./css/Loader.module.css";

const Loader = () => {
  return (
    <div className={loaderStyle.ldsDefault}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
