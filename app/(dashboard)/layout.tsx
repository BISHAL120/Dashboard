import SideBar from "@/components/navbar2/mobileNav";
import Navigation from "@/components/shared/navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navigation />
      <SideBar />
      <div className="md:mt-[50px]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
