import React from "react";
import animatedCss from "./animatedButton.module.css";
import { Search } from "lucide-react";

const AnimatedButton = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <button className={`${animatedCss.button} w-full`}>
        <div className={`${animatedCss.icon}`}>
          <span className={`${animatedCss.text_icon} ${animatedCss.hide} `}>
            Expense
          </span>
          <Search />
        </div>
        <span className={`${animatedCss.title} w-full`}>
          {" "}
          Full Detail&lsquo;s{" "}
        </span>
        <div className={`${animatedCss.padding_left} ${animatedCss.hide}`}>
          <div className={`${animatedCss.padding_left_line}`}>
            <span className={`${animatedCss.padding_left_text}`}>
              Customer Detail&lsquo;s
            </span>
          </div>
        </div>
        <div className={`${animatedCss.padding_right} ${animatedCss.hide}`}>
          <div className={`${animatedCss.padding_right_line}`}>
            <span className={`${animatedCss.padding_right_text}`}>Revenue</span>
          </div>
        </div>
        {/* <div className={`${animatedCss.padding_right}${animatedCss.hide}`}>
          <div className={`${animatedCss.padding_right_line}`}>
            <span className={`${animatedCss.padding_right_text}`}>
              Right Padding
            </span>
          </div>
        </div> */}
        <div className={`${animatedCss.background} ${animatedCss.hide}`}>
          <span className={`${animatedCss.background_text}`}>Profit</span>
        </div>
        <div className={`${animatedCss.border} ${animatedCss.hide}`}>
          <span className={`${animatedCss.border_text}`}>Total Overview</span>
        </div>
      </button>
    </div>
  );
};

export default AnimatedButton;
