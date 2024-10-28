import React from "react";
import SideBar from "@/components/navbar2/navbarthree";
import Navigation from "@/components/shared/navigation";

import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navigation />
      <SidebarProvider defaultOpen={false}>
        <AppSidebar
          className="top-[56px] max-h-[calc(100vh-56px)] hidden md:flex"
          variant="floating"
        />
        <SidebarTrigger className="sticky top-[58px] max-h-[calc(100vh-56px)]" />
        <SidebarInset className="md:pt-[56px] pt-[30px]">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
{
  /* <DockDemo /> */
}
