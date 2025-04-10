import React from "react";
import welcome from "./welcomeCard.module.css";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

const WelcomeCard = () => {
  return (
    <div className="bg-[#ecf2ff] p-4 rounded-md w-full  md:mt-5 md:mx-3 relative flex flex-col sm:flex-row sm:justify-between items-center gap-3">
      <div>
        <p className="text-[#3f48f1] text-xl font-semibold">Hello, Bishal!</p>
        <p className="text-lg font-medium text-[#252733] tracking-wide mb-2">
          Visualize, analyze, and transform  your <br />data into actionable insights.
        </p>
      </div>
      <div className="">
        <Image
          as={NextImage}
          src="/image/profile/welcome-bg2.png"
          alt="Welcome Image"
          width={300}
          height={200}
          className="-mb-4 w-[240px] md:w-[300px] lg:w-[360px] "
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
