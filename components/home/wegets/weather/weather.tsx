"use client";

import React, { useEffect, useState } from "react";
import weatherCss from "./weather.module.css";
import { formatDate } from "date-fns";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const data = fetch(
      "http://api.weatherapi.com/v1/current.json?key=59b5be201a1446bead721751242708&q=Jessore"
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <div className="hidden lg:flex">
      <div className={`${weatherCss.card} lg:h-[235px]`}>
        <div className={`${weatherCss.container}`}>
          <div className={`${weatherCss.cloud} ${weatherCss.front}`}>
            <span className={`${weatherCss.left_front}`}></span>
            <span className={`${weatherCss.right_front}`}></span>
          </div>
          <span className={`${weatherCss.sun} ${weatherCss.sunshine}`}></span>
          <span className={`${weatherCss.sun}`}></span>
          <div className={`${weatherCss.cloud} ${weatherCss.back}`}>
            <span className={`${weatherCss.left_back}`}></span>
            <span className={`${weatherCss.right_back}`}></span>
          </div>
        </div>

        <div className={`${weatherCss.card_header}`}>
          <span>
            {weather?.location?.name ? weather.location.name : ""}
            <br />
            {weather?.location?.country ? weather.location.country : ""}
          </span>
          <span>
            {weather?.current?.condition?.text
              ? weather.current.condition.text
              : ""}
          </span>
        </div>

        <span className={`${weatherCss.temp}`}>
          {weather?.current?.temp_c ? weather.current.temp_c + "" : "Loading.."}
          °
        </span>

        <div className={`${weatherCss.temp_scale}`}>
          <span>Celcius</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
