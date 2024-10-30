import React from "react";
import loadingCss from "./loading.module.css";

const Loading = () => {
  return (
    <div>
      <div className={`${loadingCss.spinner}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
