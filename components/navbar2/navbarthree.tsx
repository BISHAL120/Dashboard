"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Percent,
  Settings,
  ShoppingCart,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  {
    name: "Orders",
    icon: ShoppingCart,
    href: "/orders",
    subItems: [
      { name: "All Orders", href: "/orders" },
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

const SideBar = ({ className }: { className?: string }) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((item) => item !== menu) : [menu]
    );
  };

  return (
    <div className="">
      <Sheet onOpenChange={() => setOpenMenus([])}>
        <SheetTrigger
          className={`w-11 h-11 rounded-full absolute top-5 left-7 text-white bg-primary border-blue-700 border-[2px] hover:bg-white/40 hover:text-primary flex justify-center items-center ${className}`}
        >
          <Menu className="h-6 w-6 " />
          <span className="sr-only">Sidebar Toggle</span>
        </SheetTrigger>
        <SheetContent className="p-0" side={"left"}>
          <div
            className={` inset-y-0 h-full shadow-lg  bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500`}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h1 className="text-xl font-semibold text-white">
                E-commerce Admin
              </h1>
            </div>
            <div className="p-4 h-[calc(100vh-160px)] bg">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{
                      opacity: 0,
                      x: 50,
                      y: 100,
                    }}
                    animate={{ opacity: 1, x: 1, y: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + index * 0.2,
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
                            {item.subItems.map((subItem, i) => (
                              <motion.li
                                initial={{
                                  opacity: 0,
                                  x: 50,
                                }}
                                animate={{ opacity: 1, x: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.1 + i * 0.2,
                                }}
                                key={subItem.name}
                                className="ml-5"
                              >
                                <Link
                                  href={subItem.href}
                                  className="flex items-center p-2 text-md font-medium text-black rounded-lg hover:bg-white/10 transition-colors duration-200"
                                >
                                  {subItem.name}
                                </Link>
                              </motion.li>
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
            </div>
            <div className="p-4 border-t border-white/10">
              <Popover>
                <PopoverTrigger className="hover:text-white w-full">
                  <Button
                    variant="ghost"
                    className="w-full h-full justify-start text-left text-white hover:bg-white/10"
                  >
                    <div className="flex items-center space-x-4 space-y-3">
                      <Avatar>
                        <AvatarImage
                          src="/image/profile/user-1.jpg"
                          alt="User"
                        />
                        {/* TODO: Add User Name in the AvatarFallback */}
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 ">
                        <p className="text-sm font-medium ">John Doe</p>
                        <p className="text-xs text-white/60">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] border-none bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500  text-white">
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 50,
                    }}
                    animate={{ opacity: 1, x: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2,
                    }}
                    className="cursor-pointer"
                  >
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
                  </motion.div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideBar;
