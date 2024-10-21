import React from "react";
import loadingCss from "./loading.module.css";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[90vh] bg-[#e7dede81]">
      <div className={`${loadingCss.loader}`}>
        <div className={`${loadingCss.circle}`}></div>
        <div className={`${loadingCss.circle}`}></div>
        <div className={`${loadingCss.circle}`}></div>
        <div className={`${loadingCss.circle}`}></div>
      </div>
    </div>
  );
};

export default Loading;
