import React from "react";
import loadingCss from "./loading.module.css";

const ProductLoading = () => {
  return (
    <div className="w-full h-[calc(100vh-90px)] flex justify-center items-center bg-transparent">
      <div className={`${loadingCss.center_div}`}>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
        <div className={`${loadingCss.wave}`}></div>
      </div>
    </div>
  );
};

export default ProductLoading;
