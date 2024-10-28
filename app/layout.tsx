import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "react-hot-toast";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navigation from "@/components/shared/navigation";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Developed by Bishal",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head /> */}
      <body className={poppins.className}>
        <NextUIProvider className="">
          {children}
          <Toaster />
        </NextUIProvider>
      </body>
    </html>
  );
}
