import React from "react";
import SideBar from "@/components/navbar2/navbarthree";
import Navigation from "@/components/shared/navigation";

import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="sticky top-0 bg-transparent/10 backdrop-blur-xl z-50">
        <Navigation />
        {/* <SideBar /> */}
      </div>
      {/* <SidebarNavigation className="" /> */}
      {children}
      {/* <DockDemo /> */}
    </div>
  );
};

export default DashboardLayout;
