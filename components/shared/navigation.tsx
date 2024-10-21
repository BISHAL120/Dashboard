import SideBar from "../navbar2/navbarthree";
import MenuBar from "../navigation/menuBar";
import Notification from "../navigation/notification";
import ProfilePopover from "../navigation/profile";

const Navigation = () => {
  return (
    <div className="bg-[#e7dede81] py-5">
      <div className="max-w-[1200px] mx-auto px-2 flex justify-between items-center">
        <div className="hidden lg:flex ml-20 xl:ml-0 ">
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
  );
};

export default Navigation;
