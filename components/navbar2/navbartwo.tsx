"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  LogOut,
  UserCircle,
  Bell,
  CreditCard,
  Percent,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

export default function SidebarNavigation({
  className,
}: {
  className?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/orders",
      subItems: [
        { name: "All Orders", href: "/orders/all" },
        { name: "Pending Orders", href: "/orders/pending" },
        { name: "Completed Orders", href: "/orders/completed" },
        { name: "Cancelled Orders", href: "/orders/cancelled" },
      ],
    },
    {
      name: "Products",
      icon: Package,
      href: "/products",
      subItems: [
        { name: "All Products", href: "/products/all" },
        { name: "Add New Product", href: "/products/new" },
        { name: "Categories", href: "/products/categories" },
        { name: "Inventory", href: "/products/inventory" },
      ],
    },
    {
      name: "Customers",
      icon: Users,
      href: "/customers",
      subItems: [
        { name: "All Customers", href: "/customers/all" },
        { name: "VIP Customers", href: "/customers/vip" },
        { name: "Customer Segments", href: "/customers/segments" },
      ],
    },
    {
      name: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      subItems: [
        { name: "Sales Analytics", href: "/analytics/sales" },
        { name: "Traffic Analytics", href: "/analytics/traffic" },
        { name: "Customer Analytics", href: "/analytics/customers" },
      ],
    },
    {
      name: "Marketing",
      icon: Percent,
      href: "/marketing",
      subItems: [
        { name: "Campaigns", href: "/marketing/campaigns" },
        { name: "Discounts", href: "/marketing/discounts" },
        { name: "Email Marketing", href: "/marketing/email" },
      ],
    },
    {
      name: "Content",
      icon: FileText,
      href: "/content",
      subItems: [
        { name: "Pages", href: "/content/pages" },
        { name: "Blog Posts", href: "/content/blog" },
        { name: "Media Library", href: "/content/media" },
      ],
    },
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Help", icon: HelpCircle, href: "/help" },
  ];

  return (
    <div className={`${className}`}>
      <Button
        className="w-16 h-16 rounded-full fixed top-3 left-7 z-50 text-white bg-primary border-blue-700 border-[2px] hover:bg-white/40 hover:text-primary"
        onClick={toggleSidebar}
      >
        <Menu className="h-10 w-10 " />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white">E-commerce Admin</h1>
          <Button
            variant="ghost"
            size="icon"
            className=" border-[2px] text-white hover:bg-white/40"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                animate={{ opacity: 1, x: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.2,
                }}
              >
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="flex items-center justify-between w-full p-2 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </div>
                      {openMenus.includes(item.name) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {openMenus.includes(item.name) && (
                      <ul className="ml-6 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="flex items-center p-2 text-sm text-white/80 rounded-lg hover:bg-white/10 transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center p-2 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Popover placement="top-end">
            <PopoverTrigger className="hover:text-white">
              <Button
                variant="ghost"
                className="w-full h-full justify-start text-left text-white hover:bg-white/10"
              >
                <div className="flex items-center space-x-4 space-y-3">
                  <Avatar>
                    <AvatarImage src="/image/profile/user-1.jpg" alt="User" />
                    {/* TODO: Add User Name in the AvatarFallback */}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 ">
                    <p className="text-sm font-medium ">John Doe</p>
                    <p className="text-xs text-white/60">john@example.com</p>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 border-white/10 text-white">
              <div className="grid gap-2 w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-white/10"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-white/10"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-white/10"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-white/10"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-white/10"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-red-300 hover:bg-red-500/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
