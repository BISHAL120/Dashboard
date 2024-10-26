import React from "react";
import AddLoadingCss from "./loading.module.css";

const AddLoading = () => {
  return (
    <div className="">
      <div className={`${AddLoadingCss.loader} scale-125`}></div>
    </div>
  );
};

export default AddLoading;
