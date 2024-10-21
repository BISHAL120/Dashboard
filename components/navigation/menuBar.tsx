"use client";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  BookCheck,
  FilePlus2,
  Grid2X2,
  LayoutDashboardIcon,
  PackageX,
  PackageXIcon,
  SquarePen,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";

const MenuBar = () => {
  return (
    <div>
      <div className="flex justify-start items-center gap-4">
        <Link href="/" className="text-2xl font-semibold text-blue-600 ">
          <LayoutDashboardIcon className="w-8 h-8" />
        </Link>
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="group">
            <Button variant="bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="w-6 h-6 animate-appearance-in"
              >
                <g fill="none" stroke="#ba3bde" strokeWidth="2">
                  <rect width="14" height="17" x="5" y="4" rx="2" />
                  <path strokeLinecap="round" d="M9 9h6m-6 4h6m-6 4h4" />
                </g>
              </svg>
              Orders
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                className="group-hover:animate-bounce"
              >
                <path
                  fill="#ba3bde"
                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                />
              </svg>
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="group" aria-label="Static Actions">
            <DropdownItem href="/order/pending" key="pending" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <rect
                    width="7.33"
                    height="7.33"
                    x="1"
                    y="1"
                    fill="currentColor"
                  >
                    <animate
                      id="svgSpinnersBlocksWave0"
                      attributeName="x"
                      begin="0;svgSpinnersBlocksWave1.end+0.14s"
                      dur="0.42s"
                      values="1;4;1"
                    />
                    <animate
                      attributeName="y"
                      begin="0;svgSpinnersBlocksWave1.end+0.14s"
                      dur="0.42s"
                      values="1;4;1"
                    />
                    <animate
                      attributeName="width"
                      begin="0;svgSpinnersBlocksWave1.end+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="0;svgSpinnersBlocksWave1.end+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="8.33"
                    y="1"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="8.33;11.33;8.33"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="1;4;1"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="1"
                    y="8.33"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="1;4;1"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="8.33;11.33;8.33"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.07s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="15.66"
                    y="1"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="15.66;18.66;15.66"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="1;4;1"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="8.33"
                    y="8.33"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="8.33;11.33;8.33"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="8.33;11.33;8.33"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="1"
                    y="15.66"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="1;4;1"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="15.66;18.66;15.66"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.14s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="15.66"
                    y="8.33"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="15.66;18.66;15.66"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="8.33;11.33;8.33"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="8.33"
                    y="15.66"
                    fill="currentColor"
                  >
                    <animate
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="8.33;11.33;8.33"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="15.66;18.66;15.66"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.21s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                  <rect
                    width="7.33"
                    height="7.33"
                    x="15.66"
                    y="15.66"
                    fill="currentColor"
                  >
                    <animate
                      id="svgSpinnersBlocksWave1"
                      attributeName="x"
                      begin="svgSpinnersBlocksWave0.begin+0.28s"
                      dur="0.42s"
                      values="15.66;18.66;15.66"
                    />
                    <animate
                      attributeName="y"
                      begin="svgSpinnersBlocksWave0.begin+0.28s"
                      dur="0.42s"
                      values="15.66;18.66;15.66"
                    />
                    <animate
                      attributeName="width"
                      begin="svgSpinnersBlocksWave0.begin+0.28s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                    <animate
                      attributeName="height"
                      begin="svgSpinnersBlocksWave0.begin+0.28s"
                      dur="0.42s"
                      values="7.33;1.33;7.33"
                    />
                  </rect>
                </svg>
                Pending Orders
              </div>
            </DropdownItem>
            <DropdownItem href="/order/complete" key="complete" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <defs>
                    <mask id="lineMdCheckAll0">
                      <g
                        fill="none"
                        stroke="#fff"
                        stroke-dasharray="22"
                        stroke-dashoffset="22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path
                          stroke="#000"
                          strokeWidth="4"
                          d="M7.5 13.5l4 4l10.75 -10.75"
                          opacity="0"
                        >
                          <set
                            attributeName="opacity"
                            begin="0.28s"
                            to="1"
                            repeatCount="indefinite"
                          />
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.28s"
                            dur="1.4s"
                            values="22;0"
                            repeatCount="indefinite"
                          />
                        </path>
                        <path d="M7.5 13.5l4 4l10.75 -10.75" opacity="0">
                          <set
                            attributeName="opacity"
                            begin="0.28s"
                            to="1"
                            repeatCount="indefinite"
                          />
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.28s"
                            dur="1.4s"
                            values="22;0"
                            repeatCount="indefinite"
                          />
                        </path>
                      </g>
                    </mask>
                  </defs>
                  <rect
                    width="24"
                    height="24"
                    fill="currentColor"
                    mask="url(#lineMdCheckAll0)"
                  />
                </svg>
                Complete Orders
              </div>
            </DropdownItem>
            <DropdownItem href="/order/cancel" key="cancel" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-dasharray="12"
                    stroke-dashoffset="12"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="1.4s"
                      values="12;0"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
                Cancel Orders
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="group">
            <Button variant="bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
                className="w-6 h-6 animate-appearance-in"
              >
                <g
                  fill="none"
                  stroke="#ba3bde"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path d="M44 14L24 4L4 14v20l20 10l20-10z" />
                  <path
                    strokeLinecap="round"
                    d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"
                  />
                </g>
              </svg>
              Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                className="group-hover:animate-bounce"
              >
                <path
                  fill="#ba3bde"
                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                />
              </svg>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              href="/product/id/new"
              key="productNew"
              color="primary"
            >
              <div className="flex justify-start items-center gap-2">
                <FilePlus2 size={18} />
                Add New
              </div>
            </DropdownItem>
            <DropdownItem href="/product/all" key="productAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <Grid2X2 size={18} />
                All Products
              </div>
            </DropdownItem>
            <DropdownItem
              href="/product/stockOut"
              key="stockOut"
              color="primary"
            >
              <div className="flex justify-start items-center gap-2">
                <PackageXIcon size={18} />
                Out Of Stock
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="group">
            <Button variant="bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
                className="w-5 h-5 animate-appearance-in"
              >
                <path
                  fill="#ba3bde"
                  d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z"
                />
              </svg>
              Blogs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                className="group-hover:animate-bounce"
              >
                <path
                  fill="#ba3bde"
                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                />
              </svg>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem href="/blog/id/new" key="blogNew" color="primary">
              <div className="flex justify-start items-center gap-2">
                <FilePlus2 size={18} />
                Add New
              </div>
            </DropdownItem>
            <DropdownItem href="/blog/all" key="blogAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <Grid2X2 size={18} />
                All Blogs
              </div>
            </DropdownItem>
            <DropdownItem href="/blog/drafts" key="blogDrafts" color="primary">
              <div className="flex justify-start items-center gap-2">
                <SquarePen size={18} />
                Drafts
              </div>
            </DropdownItem>
            <DropdownItem
              href="/blog/published"
              key="blogPublished"
              color="primary"
            >
              <div className="flex justify-start items-center gap-2">
                <BookCheck size={19} />
                Published
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <Dropdown placement="bottom-start">
          <DropdownTrigger className="group">
            <Button variant="bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
                className="w-5 h-5 animate-appearance-in"
              >
                <path
                  fill="#ba3bde"
                  d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z"
                />
              </svg>
              Text Editor
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                className="group-hover:animate-bounce"
              >
                <path
                  fill="#ba3bde"
                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                />
              </svg>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem href="/text" key="blogNew" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18v-3m0 0v-3m0 3H9m3 0h3M13 3H8.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V9m-6-6c.286.003.466.014.639.055c.204.05.399.13.578.24c.202.124.375.297.72.643l3.126 3.125c.346.346.518.518.642.72c.11.18.19.374.24.578c.04.173.051.354.054.639M13 3v2.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h2.802m0 0H19"
                  />
                </svg>
                Add New
              </div>
            </DropdownItem>
            <DropdownItem href="/blog/all" key="blogAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <defs>
                    <mask id="ipTAllApplication0">
                      <path
                        fill="#555"
                        stroke="#fff"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M18 6H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2ZM40 6H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Z"
                      />
                    </mask>
                  </defs>
                  <path
                    fill="currentColor"
                    d="M0 0h48v48H0z"
                    mask="url(#ipTAllApplication0)"
                  />
                </svg>
                All Blogs
              </div>
            </DropdownItem>
            <DropdownItem href="/blog/drafts" key="blogDrafts" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9l-.006 4.238l4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1.778 6.808l1.414 1.414L15.414 18l-1.416-.002l.002-1.412zM12 12H7v2h5zm3-4H7v2h8z"
                  />
                </svg>
                Drafts
              </div>
            </DropdownItem>
            <DropdownItem
              href="/blog/archived"
              key="blogArchived"
              color="primary"
            >
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3z"
                  />
                </svg>
                Archived Blogs
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="group">
            <Button variant="bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="w-6 h-6 animate-appearance-in"
              >
                <g fill="#ba3bde">
                  <path
                    d="M136 108a52 52 0 1 1-52-52a52 52 0 0 1 52 52"
                    opacity="0.2"
                  />
                  <path d="M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71M40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44m210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07" />
                </g>
              </svg>{" "}
              Users
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
                className="group-hover:animate-bounce"
              >
                <path
                  fill="#ba3bde"
                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                />
              </svg>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem href="/admin" key="adminAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <UserRoundCog className="ml-0.5" size={18} />
                Admin
              </div>
            </DropdownItem>
            <DropdownItem href="/user/new" key="managerAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    color="currentColor"
                  >
                    <path d="M20 22v-5c0-1.886 0-2.828-.586-3.414S17.886 13 16 13l-4 9l-4-9c-1.886 0-2.828 0-3.414.586S4 15.114 4 17v5" />
                    <path d="m12 15l-.5 4l.5 1.5l.5-1.5zm0 0l-1-2h2zm3.5-8.5v-1a3.5 3.5 0 1 0-7 0v1a3.5 3.5 0 1 0 7 0" />
                  </g>
                </svg>
                All Managers
              </div>
            </DropdownItem>
            <DropdownItem href="/user/new" key="managerAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M19.938 8H21a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8 8 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 0 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0M3 10v4h1v-4zm17 0v4h1v-4zM7.76 15.785l1.06-1.696A5.97 5.97 0 0 0 12 15a5.97 5.97 0 0 0 3.18-.911l1.06 1.696A7.96 7.96 0 0 1 12 17a7.96 7.96 0 0 1-4.24-1.215"
                  />
                </svg>
                Supports
              </div>
            </DropdownItem>
            <DropdownItem href="/user/all" key="uaerAll" color="primary">
              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 36 36"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M17.9 17.3c2.7 0 4.8-2.2 4.8-4.9s-2.2-4.8-4.9-4.8S13 9.8 13 12.4c0 2.7 2.2 4.9 4.9 4.9m-.1-7.7q.15 0 0 0c1.6 0 2.9 1.3 2.9 2.9s-1.3 2.8-2.9 2.8S15 14 15 12.5c0-1.6 1.3-2.9 2.8-2.9"
                    className="clr-i-outline clr-i-outline-path-1"
                  />
                  <path
                    fill="currentColor"
                    d="M32.7 16.7c-1.9-1.7-4.4-2.6-7-2.5h-.8q-.3 1.2-.9 2.1c.6-.1 1.1-.1 1.7-.1c1.9-.1 3.8.5 5.3 1.6V25h2v-8z"
                    className="clr-i-outline clr-i-outline-path-2"
                  />
                  <path
                    fill="currentColor"
                    d="M23.4 7.8c.5-1.2 1.9-1.8 3.2-1.3c1.2.5 1.8 1.9 1.3 3.2c-.4.9-1.3 1.5-2.2 1.5c-.2 0-.5 0-.7-.1c.1.5.1 1 .1 1.4v.6c.2 0 .4.1.6.1c2.5 0 4.5-2 4.5-4.4c0-2.5-2-4.5-4.4-4.5c-1.6 0-3 .8-3.8 2.2c.5.3 1 .7 1.4 1.3"
                    className="clr-i-outline clr-i-outline-path-3"
                  />
                  <path
                    fill="currentColor"
                    d="M12 16.4q-.6-.9-.9-2.1h-.8c-2.6-.1-5.1.8-7 2.4L3 17v8h2v-7.2c1.6-1.1 3.4-1.7 5.3-1.6c.6 0 1.2.1 1.7.2"
                    className="clr-i-outline clr-i-outline-path-4"
                  />
                  <path
                    fill="currentColor"
                    d="M10.3 13.1c.2 0 .4 0 .6-.1v-.6c0-.5 0-1 .1-1.4c-.2.1-.5.1-.7.1c-1.3 0-2.4-1.1-2.4-2.4S9 6.3 10.3 6.3c1 0 1.9.6 2.3 1.5c.4-.5 1-1 1.5-1.4c-1.3-2.1-4-2.8-6.1-1.5s-2.8 4-1.5 6.1c.8 1.3 2.2 2.1 3.8 2.1"
                    className="clr-i-outline clr-i-outline-path-5"
                  />
                  <path
                    fill="currentColor"
                    d="m26.1 22.7l-.2-.3c-2-2.2-4.8-3.5-7.8-3.4c-3-.1-5.9 1.2-7.9 3.4l-.2.3v7.6c0 .9.7 1.7 1.7 1.7h12.8c.9 0 1.7-.8 1.7-1.7v-7.6zm-2 7.3H12v-6.6c1.6-1.6 3.8-2.4 6.1-2.4c2.2-.1 4.4.8 6 2.4z"
                    className="clr-i-outline clr-i-outline-path-6"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
                All Users
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default MenuBar;
