"use client";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { User } from "@nextui-org/react";
import type { Notification } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const NotificationComponent = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const router = useRouter();

  // Function to fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get("/api/notification/get");
      setNotifications(res.data.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      await axios.post("/api/notification/read", { id });
      toast.success("Notification marked as read", {
        duration: 3000,
        style: {
          backgroundColor: "#000",
          color: "whitesmoke",
        },
      });
      await fetchNotifications(); // Fetch updated notifications after marking as read
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#000",
          color: "whitesmoke",
        },
      });
    }
  };

  const newNotification = notifications.find(
    (notification) => notification.read === false
  );

  return (
    <div className="cursor-pointer">
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        backdrop="blur"
      >
        <PopoverTrigger className="relative bg-slate-300 w-10 h-10 rounded-full flex justify-center items-center">
          <div>
            {newNotification && (
              <div className="w-3 h-3 bg-blue-600 rounded-full absolute top-0 right-0" />
            )}
            <div className="">
              <div
                className={`${
                  newNotification && "animate-bell"
                } p-0 w-8 h-8 flex justify-center items-center rounded-full`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1m6-10.273A11.05 11.05 0 0 0 18.206 3M3 6.727A11.05 11.05 0 0 1 5.792 3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[330px] cus_notification_with md:w-[400px]">
          <div className="w-full px-1 py-2">
            <div className="flex justify-between items-center p-3">
              <div className="text-small font-bold">Notifications</div>
              <div className="text-tiny font-medium bg-blue-700 p-3 h-6 flex items-center justify-center text-white rounded-full">
                {notifications.length} new
              </div>
            </div>
            <div className="overflow-auto no-scrollbar h-[400px] scroll-m-4 rounded-xl">
              {notifications.map((item, i) => (
                <div
                  key={i}
                  className=" flex justify-between items-center hover:bg-gray-200 px-1 py-3 rounded-lg cursor-default "
                >
                  <div className="flex justify-start items-center gap-2 ">
                    <User
                      name=""
                      avatarProps={{
                        src: "/image/profile/user-1.jpg",
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold">{item.userId}</div>
                      <div className="text-xs font-normal mr-3 text-ellipsis whitespace-nowrap overflow-hidden">
                        {item.message}{" "}
                      </div>
                      <div className="text-xs font-normal mr-3 text-ellipsis whitespace-nowrap overflow-hidden">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {item.read ? (
                    <div>
                      <Link href={`/notification/${i}`}>
                        <Button
                          size="sm"
                          className="w-5 hover:bg-blue-600 hover:text-white bg-[#44835d]/50 text-white"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          markAsRead(item.id);
                        }}
                        size="sm"
                        className="w-5 hover:bg-blue-600 hover:text-white bg-[#2c764a] text-white"
                      >
                        Read
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center py-3 pt-5">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  axios.post("/api/notification/read", {}).then(() => {
                    fetchNotifications();
                    toast.success("All notifications marked as read");
                  });
                }}
                color="success"
                className=" w-full"
              >
                Mark All as Read
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationComponent;
