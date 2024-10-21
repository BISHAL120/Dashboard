import React from "react";
import infoCard from "./infoCard.module.css";

const InfoCard = () => {
  return (
    <div>
      <div className={infoCard.container}>
        <div className={infoCard.card}>
          <div className={infoCard.front}>
            <p className={infoCard.front_heading}>Front card</p>
            <p>Follow Me For More</p>
          </div>
          <div className={infoCard.back}>
            <p className={infoCard.back_heading}>Back card</p>
            <p>Follow Me For More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
