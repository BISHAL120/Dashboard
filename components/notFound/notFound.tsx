import Link from "next/link";
import notFoundCss from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className="h-screen bg-black relative">
      <div className={`${notFoundCss.box_of_star1} `}>
        <div className="  text-center text-7xl text-[#322f2f] font-bold">
          Page Not Found
        </div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position1}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position2}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position3}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position4}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position5}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position6}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position7}`}
        ></div>
      </div>
      <div className={`${notFoundCss.box_of_star2}`}>
        <div className="w-full text-center text-7xl text-[#322f2f] font-bold">
          Page Not Found
        </div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position1}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position2}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position3}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position4}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position5}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position6}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position7}`}
        ></div>
      </div>
      <div className={`${notFoundCss.box_of_star3}`}>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position1}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position2}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position3}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position4}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position5}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position6}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position7}`}
        ></div>
      </div>
      <div className={`${notFoundCss.box_of_star4}`}>
        <div className=" w-full text-center text-7xl text-[#322f2f] font-bold">
          Page Not Found
        </div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position1}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position2}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position3}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position4}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position5}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position6}`}
        ></div>
        <div
          className={`${notFoundCss.star} ${notFoundCss.star_position7}`}
        ></div>
      </div>
      {/* <div className="box-of-star2">
        <div className="star star-position1"></div>
        <div className="star star-position2"></div>
        <div className="star star-position3"></div>
        <div className="star star-position4"></div>
        <div className="star star-position5"></div>
        <div className="star star-position6"></div>
        <div className="star star-position7"></div>
      </div> */}
      {/* <div className="box-of-star3">
        <div className="star star-position1"></div>
        <div className="star star-position2"></div>
        <div className="star star-position3"></div>
        <div className="star star-position4"></div>
        <div className="star star-position5"></div>
        <div className="star star-position6"></div>
        <div className="star star-position7"></div>
      </div> */}
      {/* <div className="box-of-star4">
        <div className="star star-position1"></div>
        <div className="star star-position2"></div>
        <div className="star star-position3"></div>
        <div className="star star-position4"></div>
        <div className="star star-position5"></div>
        <div className="star star-position6"></div>
        <div className="star star-position7"></div>
      </div> */}
      <div data-js="astro" className={`${notFoundCss.astronaut}`}>
        <div className={`${notFoundCss.head}`}></div>
        <div className={`${notFoundCss.arm} ${notFoundCss.arm_left}`}></div>
        <div className={`${notFoundCss.arm} ${notFoundCss.arm_right}`}></div>
        <div className={`${notFoundCss.body}`}>
          <div className={`${notFoundCss.panel}`}></div>
        </div>
        <div className={`${notFoundCss.leg} ${notFoundCss.leg_left}`}></div>
        <div className={`${notFoundCss.leg} ${notFoundCss.leg_right}`}></div>
        <div className={`${notFoundCss.schoolbag}`}></div>
      </div>
    </div>
  );
}
