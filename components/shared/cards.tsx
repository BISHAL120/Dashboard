import React from "react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

/* import icon3 from "../../../public/image/svg";
import icon4 from "../../../public/image/svg";
import icon5 from "../../../public/image/svg";
import icon6 from "../../../public/image/svg";
 */
interface cardType {
  href: string;
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
  shadow: string;
}

const topCards: cardType[] = [
  {
    href: "/user-profile",
    icon: "/image/svg/icon-account.svg",
    title: "Customer's",
    digits: "3,685",
    bgcolor: "bg-[#d6d3d1]",
    shadow: "shadow-[#d6d3d1]",
  },
  {
    href: "/user-profile",
    icon: "/image/svg/icon-user-male.svg",
    title: "Manager's",
    digits: "3,685",
    bgcolor: "bg-[#D5ED9F]",
    shadow: "shadow-[#D5ED9F]",
  },
  {
    href: "/apps/blog/posts",
    icon: "/image/svg/icon-briefcase.svg",
    title: "Blog's",
    digits: "256",
    bgcolor: "bg-[#D7C3F1]",
    shadow: "shadow-[#D7C3F1]",
  },
  {
    href: "/user-profile",
    icon: "/image/svg/icon-dd-application.svg",
    title: "Tasks",
    digits: "3,685",
    bgcolor: "bg-[#CCE0AC]",
    shadow: "shadow-[#CCE0AC]",
  },
  {
    href: "/apps/blog/posts",
    icon: "/image/svg/icon-pie.svg",
    title: "Optional",
    digits: "256",
    bgcolor: "bg-[#41B3A2]",
    shadow: "shadow-[#41B3A2]",
  },
  {
    href: "/user-profile",
    icon: "/image/svg/top-products.svg",
    title: "Optional",
    digits: "3,685",
    bgcolor: "bg-[#D7C3F1]",
    shadow: "shadow-[#D7C3F1]",
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:flex gap-4 justify-items-center min-h-[200px] mt-3">
      {topCards.map((card, i) => (
        <div
          key={i}
          className={` w-[95%] md:w-[224px] lg:w-[300px] xl:w-[172px] h-[161px] flex justify-center items-center m-3 rounded-lg shadow-2xl ${card.shadow} ${card.bgcolor}`}
        >
          <div className={`flex flex-col items-center justify-center p-6 `}>
            <Image
              as={NextImage}
              src={card.icon}
              alt={card.icon}
              width={50}
              height={50}
            />
            <p color={card.bgcolor + ".main"}>{card.title}</p>
            <p color={card.bgcolor + ".main"}>{card.digits}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
