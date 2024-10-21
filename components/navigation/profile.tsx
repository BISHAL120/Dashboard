"use client";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Divider, User } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import profileCss from "./profile.module.css";

const ProfilePopover = () => {
  return (
    <div className="cursor-pointer">
      <Popover backdrop="opaque" placement="bottom-end">
        <PopoverTrigger className="">
          <div>
            <div className="hidden md:flex">
              <User
                name="User Name"
                description="User Role"
                avatarProps={{
                  src: "/image/profile/user-1.jpg",
                }}
              />
            </div>
            <div className="md:hidden">
              <User
                name=""
                avatarProps={{
                  src: "/image/profile/user-1.jpg",
                }}
              />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[330px] cus_notification_with md:w-[400px]">
          <div className="w-full px-1 py-2 ">
            <div className="py-2 flex flex-col md:flex-row items-center justify-start md:items-start gap-5">
              <Image
                isBlurred
                as={NextImage}
                src={"/image/profile/user-1.jpg"}
                alt="User Image"
                width={95}
                height={95}
                className="rounded-full"
              />
              <div className={` flex flex-col h-[95px]`}>
                <p className={` font-semibold text-2xl `}>Mathew Anderson</p>
                <div>
                  <p
                    className={`text-xl font-medium text-center md:text-start -mt-1`}
                  >
                    Designer
                  </p>

                  <div className="flex justify-start items-center gap-2 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 "
                    >
                      <g
                        fill="none"
                        stroke="#ba3bde"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <rect
                          width="18"
                          height="14"
                          x="3"
                          y="5"
                          stroke-dasharray="64"
                          stroke-dashoffset="64"
                          rx="1"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="1s"
                            begin="4s"
                            values="64;0"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <path
                          stroke-dasharray="24"
                          stroke-dashoffset="24"
                          d="M3 6.5L12 12L21 6.5"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.45s"
                            dur="0.3s"
                            values="24;0"
                          />
                        </path>
                      </g>
                    </svg>
                    <p
                      className={`${profileCss.typewriter} text-base font-medium`}
                    >
                      monerulmd5@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Divider className="my-2" />
            <div className={`${profileCss.textBlink} mt-10 space-y-1`}>
              <Link
                href="/profile"
                className=" flex justify-start items-center gap-3 group cursor-pointer hover:bg-gray-200 rounded-lg p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="bg-[#ECF2FF] rounded-lg w-12 h-12 p-2"
                >
                  <circle cx="12" cy="6" r="4" fill="#ba3bde" />
                  <path
                    fill="#ba3bde"
                    d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                  />
                </svg>
                <div className="group-hover:text-[#ba3bde]">
                  <p className="text-medium font-semibold">My Profile</p>
                  <p className="text-sm font-medium">Account Settings</p>
                </div>
              </Link>
              <div className="animation-fadeIn flex justify-start items-center gap-3 group cursor-pointer hover:bg-gray-200 rounded-lg p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="bg-[#ECF2FF] rounded-lg w-12 h-12 p-2"
                >
                  <g fill="none" stroke="#ba3bde" strokeWidth="1.5">
                    <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" />
                    <path
                      strokeLinecap="round"
                      d="M2 13h3.16c.905 0 1.358 0 1.756.183c.398.183.692.527 1.281 1.214l.606.706c.589.687.883 1.031 1.281 1.214c.398.183.85.183 1.756.183h.32c.905 0 1.358 0 1.756-.183c.398-.183.692-.527 1.281-1.214l.606-.706c.589-.687.883-1.031 1.281-1.214c.398-.183.85-.183 1.756-.183H22M8 7h8m-6 3.5h4"
                    />
                  </g>
                </svg>
                <div className="group-hover:text-[#ba3bde]">
                  <p className="text-medium font-semibold">My Inbox</p>
                  <p className="text-sm font-medium">Message and Chats</p>
                </div>
              </div>
              <div className="animation-fadeIn flex justify-start items-center gap-3 group cursor-pointer hover:bg-gray-200 rounded-lg p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="bg-[#ECF2FF] rounded-lg w-12 h-12 p-2"
                >
                  <g
                    fill="none"
                    stroke="#ba3bde"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    color="#ba3bde"
                  >
                    <path d="M13.5 20s1 0 2 2c0 0 3.177-5 6-6M7 16h4m-4-5h8M6.5 3.5c-1.556.047-2.483.22-3.125.862c-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C4.253 22 5.668 22 8.496 22h2.5m4.496-18.5c1.556.047 2.484.22 3.125.862c.88.88.88 2.295.88 5.126V13.5" />
                    <path d="M6.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75" />
                  </g>
                </svg>
                <div className="group-hover:text-[#ba3bde]">
                  <p className="text-medium font-semibold">My Tasks</p>
                  <p className="text-sm font-medium">To-do and Daily Tasks</p>
                </div>
              </div>
            </div>
            <div className="mt-7">
              <Button className="w-full bg-transparent border font-semibold hover:text-white border-blue-500 hover:bg-blue-600">
                Log Out{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="3.3"
                  >
                    <path
                      stroke-dasharray="32"
                      stroke-dashoffset="32"
                      d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.28s"
                        values="32;0"
                      />
                    </path>
                    <path
                      stroke-dasharray="12"
                      stroke-dashoffset="12"
                      d="M9 12h11.5"
                      opacity="0"
                    >
                      <set attributeName="opacity" begin="0.35s" to="1" />
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.35s"
                        dur="0.14s"
                        values="12;0"
                      />
                    </path>
                    <path
                      stroke-dasharray="6"
                      stroke-dashoffset="6"
                      d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
                      opacity="0"
                    >
                      <set attributeName="opacity" begin="0.49s" to="1" />
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.49s"
                        dur="0.14s"
                        values="6;0"
                      />
                    </path>
                  </g>
                </svg>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfilePopover;
