import { db } from "@/lib/db";
import SideBar from "../navbar2/navbarthree";
import MenuBar from "../navigation/menuBar";
import Notification from "../navigation/notification";
import ProfilePopover from "../navigation/profile";
import { get } from "http";

const Navigation = async ({ className }: { className?: string }) => {
  return (
    <div
      className={`hidden lg:flex bg-[#e7dede81] py-2 w-full fixed top-0 backdrop-blur z-50 ${className}`}
    >
      <div className="w-full ">
        <div className="max-w-[1200px] px-2 mx-auto flex justify-between items-center">
          <div className="">
            <MenuBar />
          </div>

          <div className="flex justify-center lg:justify-end items-center gap-4">
            <Notification />
            <ProfilePopover />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

/* 
// Varient 1

  <div className={`hidden lg:flex bg-[#e7dede81] py-2 w-full ${className}`}>
    <div className="max-w-[1200px] mx-auto px-2 flex justify-between items-center">
      <div className="ml-20 xl:ml-0 ">
          <MenuBar />
      </div>
         <div className="lg:hidden z-10">
          <SideBar />
      </div> 
      <div className="flex justify-center lg:justify-end items-center gap-4">
          <Notification />
          <ProfilePopover />
      </div>
    </div>
  </div>
*/
