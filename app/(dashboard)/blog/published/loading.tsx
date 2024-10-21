import React from "react";
import loadingCss from "./css/loading.module.css";

const loading = () => {
  return (
    <div className=" h-[80vh] w-screen flex justify-center items-center">
      <div className={`${loadingCss.container}`}>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
        <div className={`${loadingCss.dot}`}></div>
      </div>
    </div>
  );
};

export default loading;
