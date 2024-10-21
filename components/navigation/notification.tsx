"use client";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Image, User } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const Notification = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const Read = () => {
    toast.success("Notification marked as read", {
      duration: 3000,
      style: {
        backgroundColor: "#000",
        color: "whitesmoke",
      },
    });
  };

  return (
    <div className="cursor-pointer">
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        backdrop="blur"
      >
        <PopoverTrigger className="bg-slate-300 w-10 h-10 rounded-full flex justify-center items-center">
          <div className="">
            <div
              className={`animate-bell p-0 w-8 h-8 flex justify-center items-center rounded-full`}
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
        </PopoverTrigger>
        <PopoverContent className="w-[330px] cus_notification_with md:w-[400px]">
          <div className="w-full px-1 py-2">
            <div className="flex justify-between items-center p-3">
              <div className="text-small font-bold">Notifications</div>
              <div className="text-tiny font-medium bg-blue-700 p-3 h-6 flex items-center justify-center text-white rounded-full">
                5 new
              </div>
            </div>
            <div className="overflow-auto no-scrollbar h-[400px] scroll-m-4 rounded-xl">
              {Array.from({ length: 10 }).map((item, i) => (
                <div
                  key={i}
                  className=" flex justify-between items-center hover:bg-gray-200 px-1 py-3 rounded-lg cursor-default "
                >
                  <div className="flex justify-start items-center gap-2 ">
                    {/*  <Image
                      as={NextImage}
                      src={"/image/profile/user-1.jpg"}
                      alt="User Image"
                      width={48}
                      height={48}
                      className="rounded-full w-10 h-10 md:w-12 md:h-12"
                    /> */}
                    <User
                      name=""
                      avatarProps={{
                        src: "/image/profile/user-1.jpg",
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        Md Rasal Hossin
                      </div>
                      <div className="text-xs font-normal mr-3 text-ellipsis whitespace-nowrap overflow-hidden">
                        Make a new parched
                      </div>
                    </div>
                  </div>
                  {i % 2 === 0 ? (
                    <div>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          Read();
                        }}
                        size="sm"
                        className="w-5 hover:bg-blue-600 hover:text-white bg-[#2c764a] text-white"
                      >
                        Read
                      </Button>
                    </div>
                  ) : (
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
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center py-3 pt-5">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  toast.success("All notifications marked as read");
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

export default Notification;
