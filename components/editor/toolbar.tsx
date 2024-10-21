"use client";
import { DEFAULT_COLORS } from "@/Constants/color";
import { NotificationType } from "@/Constants/notificationType";
import EmojiPicker from "@emoji-mart/react";
import { Button, Divider, Image, Input, Tooltip } from "@nextui-org/react";
import { Blog } from "@prisma/client";
import axios from "axios";
import {
  Bold,
  ChevronDown,
  Code2Icon,
  Command,
  Eye,
  EyeOffIcon,
  FileCode2,
  ImagePlus,
  Italic,
  Link,
  SmileIcon,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const insertEmoji = () => {
  document.getElementById("emojiPicker")?.click();
};

const CustomToolbar = () => {
  useEffect(() => {
    const boldButton = document.getElementById("ql-bold-button");
    if (boldButton) {
      boldButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>`;
    }
    const italicButton = document.getElementById("ql-italic-button");
    if (italicButton) {
      italicButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>`;
    }
    const underlineButton = document.getElementById("ql-underline-button");
    if (underlineButton) {
      underlineButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>`;
    }
    const strikeButton = document.getElementById("ql-strike-button");
    if (strikeButton) {
      strikeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>`;
    }
    const numberList = document.getElementById("ql-numberList-button");
    if (numberList) {
      numberList.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-ordered"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>`;
    }
    const list = document.getElementById("ql-list-button");
    if (list) {
      list.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`;
    }
    const indent = document.getElementById("ql-indent-button");
    if (indent) {
      indent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indent-decrease"><polyline points="7 8 3 12 7 16"/><line x1="21" x2="11" y1="12" y2="12"/><line x1="21" x2="11" y1="6" y2="6"/><line x1="21" x2="11" y1="18" y2="18"/></svg>`;
    }
    const outDent = document.getElementById("ql-outDent-button");
    if (outDent) {
      outDent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indent-decrease"><polyline points="7 8 3 12 7 16"/><line x1="21" x2="11" y1="12" y2="12"/><line x1="21" x2="11" y1="6" y2="6"/><line x1="21" x2="11" y1="18" y2="18"/></svg>`;
    }
    const link = document.getElementById("ql-link-button");
    if (link) {
      link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
    }
    const subScript = document.getElementById("ql-subScript-button");
    if (subScript) {
      subScript.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-subscript"><path d="m4 5 8 8"/><path d="m12 5-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>`;
    }
    const superScript = document.getElementById("ql-superScript-button");
    if (superScript) {
      superScript.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-superscript"><path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/></svg>`;
    }
    const button1 = document.getElementById("ql-direction-button");
    if (button1) {
      button1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>`;
    }

    const button2 = document.getElementById("ql-Image-button");
    if (button2) {
      button2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
    }
    const button3 = document.getElementById("ql-Highlight-button");

    if (button3) {
      // Find the svg element inside the nested span
      const nestedSvg = button3.querySelector("span > span > svg");

      if (nestedSvg) {
        // Replace the existing svg with a new one
        nestedSvg.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-highlighter"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>`;
      }
    }
    const button4 = document.getElementById("ql-code-button");
    if (button4) {
      button4.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;
    }
    const button5 = document.getElementById("ql-codeBlock-button");
    if (button5) {
      button5.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-code-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m5 12-3 3 3 3"/><path d="m9 18 3-3-3-3"/></svg>`;
    }
  }, []);
  return (
    <div className="bg-gray-200 rounded-t-lg ">
      <div id="toolbar" className="flex gap-5 flex-wrap max-w-[1490px] ">
        <Tooltip content={<div className="font-semibold ql-flip">Heading</div>}>
          <div className="w-[150px] relative group ">
            <select className="ql-header  ">
              <option></option>
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
              <option value="6"></option>
            </select>
            <div className="absolute top-1/2 -translate-y-1/2 right-3 ">
              <ChevronDown className="text-[#444] group-hover:text-white" />
            </div>
          </div>
        </Tooltip>
        <Tooltip
          content={<div className="font-semibold ql-flip">Font Size</div>}
        >
          <div className="w-[150px] relative group ">
            <select className="ql-size">
              <option value="false"></option>
              <option value="small"></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <div className="absolute top-1/2 -translate-y-1/2 right-3 ">
              <ChevronDown className="text-[#444] group-hover:text-white" />
            </div>
          </div>
        </Tooltip>
        <Divider className="h-[30px] my-auto " orientation="vertical" />
        <Tooltip
          content={<div className="font-semibold ql-flip">Text Color</div>}
        >
          <div>
            <select className="ql-color">
              {DEFAULT_COLORS.map((color, i) => (
                <option key={i} value={color.value}></option>
              ))}
            </select>
          </div>
        </Tooltip>
        <Tooltip
          content={<div className="font-semibold ql-flip">Highlight Color</div>}
        >
          <div>
            <select
              id="ql-Highlight-button"
              className="ql-background ql-editing"
            >
              {DEFAULT_COLORS.map((color, i) => (
                <option key={i} value={color.value}></option>
              ))}
            </select>
          </div>
        </Tooltip>
        <Divider className="h-[30px] my-auto " orientation="vertical" />
        <Tooltip
          content={
            <div className="font-semibold flex items-center justify-center ">
              Bold ( <Command size={16} className="font-normal" />+
              <p className="">B</p> )
            </div>
          }
        >
          <button id="ql-bold-button" className="ql-bold action_button">
            <Bold />
          </button>
        </Tooltip>
        <Tooltip
          content={
            <div className="font-semibold flex items-center justify-center ">
              Italic ( <Command size={16} className="font-normal" />+
              <p className="">I</p> )
            </div>
          }
        >
          <button id="ql-italic-button" className="ql-italic action_button">
            <Italic />
          </button>
        </Tooltip>
        <Tooltip
          content={
            <div className="font-semibold flex items-center justify-center ">
              UnderLine ( <Command size={16} className="font-normal" />+
              <p className="">U</p> )
            </div>
          }
        >
          <button
            id="ql-underline-button"
            className="ql-underline action_button"
          >
            <Underline />
          </button>
        </Tooltip>
        <Tooltip
          content={
            <div className="font-semibold line-through">StrikeThrough</div>
          }
        >
          <button id="ql-strike-button" className="ql-strike action_button">
            <Strikethrough className="" />
          </button>
        </Tooltip>
        <Divider className="h-[30px] my-auto " orientation="vertical" />
        <Tooltip content={<div className="font-semibold">Number List</div>}>
          <button
            id="ql-numberList-button"
            className="ql-list action_button"
            value="ordered"
          ></button>
        </Tooltip>
        <Tooltip content={<div className="font-semibold">Bullet List</div>}>
          <button
            id="ql-list-button"
            className="ql-list action_button"
            value="bullet"
          ></button>
        </Tooltip>
        <Tooltip content={<div className="font-semibold">Indent</div>}>
          <button
            id="ql-indent-button"
            className="ql-indent action_button"
            value="-1"
          ></button>
        </Tooltip>
        <Tooltip content={<div className="font-semibold">Outdent</div>}>
          <button
            id="ql-outDent-button"
            className="ql-indent action_button"
            value="+1"
          ></button>
        </Tooltip>
        <Tooltip content={<div className="font-semibold">Align Right</div>}>
          <button
            id="ql-direction-button"
            className="ql-direction action_button"
            value="rtl"
          ></button>
        </Tooltip>
        <Divider className="h-[30px] my-auto " orientation="vertical" />
        <Tooltip
          content={
            <div className="font-semibold flex items-center justify-center ">
              Code
            </div>
          }
        >
          <button id="ql-code-button" className="ql-code action_button">
            <Code2Icon />
          </button>
        </Tooltip>
        <Tooltip
          content={
            <div className="font-semibold flex items-center justify-center ">
              Code Block
            </div>
          }
        >
          <button
            id="ql-codeBlock-button"
            className="ql-code-block action_button"
          >
            <FileCode2 />
          </button>
        </Tooltip>

        <Tooltip content={<div className="font-semibold">link</div>}>
          <button id="ql-link-button" className="ql-link action_button">
            <Link />
          </button>
        </Tooltip>
        <Divider className="h-[30px] my-auto " orientation="vertical" />
        <Tooltip content={<div className="font-semibold">Sub-Script</div>}>
          <button
            id="ql-subScript-button"
            value="sub"
            className="ql-script action_button"
          >
            <Subscript />
          </button>
        </Tooltip>
        <Tooltip content={<div className="font-semibold">Super-Script</div>}>
          <button
            id="ql-superScript-button"
            value="super"
            className="ql-script action_button"
          >
            <Superscript />
          </button>
        </Tooltip>
        <Divider className="h-[30px] my-auto " orientation="vertical" />
        <Tooltip content={<div className="font-semibold">Image</div>}>
          <Button className="action_button" type="button">
            <ImagePlus
              onClick={() => document.getElementById("contentImage")?.click()}
              className="h-5 w-5"
            />
          </Button>
        </Tooltip>
        <Tooltip content={<div className="font-semibold">Emoji</div>}>
          <Button className="action_button" type="button">
            <SmileIcon onClick={() => insertEmoji()} className="h-5 w-5" />
          </Button>
        </Tooltip>

        <Tooltip content={<div className="font-semibold">Video</div>}>
          <button
            id="ql-Video-button"
            className="ql-video action_button"
          ></button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CustomToolbar;
