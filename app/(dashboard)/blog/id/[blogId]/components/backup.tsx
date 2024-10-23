"use client";
import { NotificationType } from "@/Constants/notificationType";
import EmojiPicker from "@emoji-mart/react";
import { Button, Divider, Image, Input, Tooltip } from "@nextui-org/react";
import { Blog } from "@prisma/client";
import axios from "axios";
import { Eye, EyeOffIcon } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./toolbar";

const Editor = () => {
  const [data, setData] = useState<Blog | null>(null);
  const [value, setValue] = useState(data?.value || "");
  const [tittle, setTittle] = useState(data?.title || "");
  const [preview, setPreview] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const quillRef = useRef(null); // Ref for ReactQuill
  const [banner, setBanner] = useState<File | null>(null);
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setBanner(file);
    }
  };

  const insertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files[0];

      const formData = new FormData();

      formData.append("file", files);

      const response = await axios.post("/api/upload/image", formData);
      console.log(response);

      insertImageAtCursor(response.data.URL);
    }
  };

  const insertImageAtCursor = (imgURL: string | ArrayBuffer | null) => {
    if (quillRef.current === null) return;
    /* @ts-ignore */
    const editor = quillRef.current.getEditor(); // Access Quill editor instance
    const range = editor.getSelection(); // Get current cursor position
    if (range) {
      editor.insertEmbed(range.index, "image", imgURL); // Insert image at cursor
    }
  };

  const insertEmojiAtCursor = (emoji: any) => {
    if (quillRef.current === null) return;
    /* @ts-ignore */
    const editor = quillRef.current.getEditor(); // Access Quill editor instance
    const range = editor.getSelection(); // Get current cursor position

    if (range) {
      editor.insertText(range.index, `${emoji.native}`);
    }
    setEmojiPicker(false);
  };

  useEffect(() => {
    const boldButton = document.getElementById("ql-bold-button");
    if (boldButton) {
      boldButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>`;
    }
    const italicButton = document.getElementById("ql-italic-button");
    if (italicButton) {
      italicButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>`;
    }
    const underlineButton = document.getElementById("ql-underline-button");
    if (underlineButton) {
      underlineButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-underline"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>`;
    }
    const strikeButton = document.getElementById("ql-strike-button");
    if (strikeButton) {
      strikeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-strikethrough"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>`;
    }
    const numberList = document.getElementById("ql-numberList-button");
    if (numberList) {
      numberList.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-list-ordered"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>`;
    }
    const list = document.getElementById("ql-list-button");
    if (list) {
      list.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`;
    }
    const indent = document.getElementById("ql-indent-button");
    if (indent) {
      indent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-indent-decrease"><polyline points="7 8 3 12 7 16"/><line x1="21" x2="11" y1="12" y2="12"/><line x1="21" x2="11" y1="6" y2="6"/><line x1="21" x2="11" y1="18" y2="18"/></svg>`;
    }
    const outDent = document.getElementById("ql-outDent-button");
    if (outDent) {
      outDent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-indent-decrease"><polyline points="7 8 3 12 7 16"/><line x1="21" x2="11" y1="12" y2="12"/><line x1="21" x2="11" y1="6" y2="6"/><line x1="21" x2="11" y1="18" y2="18"/></svg>`;
    }
    const link = document.getElementById("ql-link-button");
    if (link) {
      link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
    }
    const subScript = document.getElementById("ql-subScript-button");
    if (subScript) {
      subScript.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-subscript"><path d="m4 5 8 8"/><path d="m12 5-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>`;
    }
    const superScript = document.getElementById("ql-superScript-button");
    if (superScript) {
      superScript.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-superscript"><path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/></svg>`;
    }
    const button1 = document.getElementById("ql-direction-button");
    if (button1) {
      button1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-align-right"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>`;
    }

    const button2 = document.getElementById("ql-Image-button");
    if (button2) {
      button2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
    }
    const button3 = document.getElementById("ql-Highlight-button");

    if (button3) {
      // Find the svg element inside the nested span
      const nestedSvg = button3.querySelector("span > span > svg");

      if (nestedSvg) {
        // Replace the existing svg with a new one
        nestedSvg.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-highlighter"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>`;
      }
    }
    const button4 = document.getElementById("ql-code-button");
    if (button4) {
      button4.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;
    }
    const button5 = document.getElementById("ql-codeBlock-button");
    if (button5) {
      button5.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-file-code-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m5 12-3 3 3 3"/><path d="m9 18 3-3-3-3"/></svg>`;
    }
  }, []);

  const submitBlog = async () => {
    toast.loading("Uploading...");

    switch (true) {
      case !tittle:
        toast.error("Please enter tittle", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case !banner:
        toast.error("Please upload banner", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case !value:
        toast.error("Please enter content", {
          position: "top-center",
          duration: 3000,
        });
        return;
    }

    const formData = new FormData();
    if (banner) {
      formData.append("file", banner);
    }

    const response = await axios.post("/api/upload/image", formData);

    const blog = {
      tittle: tittle,
      value: value,
      banner: response.data.URL,
    };

    await axios.post("/api/upload/blog", blog).then(async (res) => {
      if (res.status === 200) {
        toast.dismiss();
        toast.success(res.data.success, {
          position: "top-center",
          duration: 3000,
        });
        console.log(res);
        await axios
          .post("/api/notification", {
            message: "New Blog Added",
            type: NotificationType.BlogCreated,
            userId: "Demo User", // TODO: Replace with actual user
            referId: res.data.data.id,
          })
          .then(() => {
            // router.push("/blog/all");
          });
      } else {
        toast.dismiss();
        toast.error(res.data.error, {
          position: "top-center",
          duration: 3000,
        });
      }
    });
  };

  return (
    <div className="max-w-[1550px] mx-auto py-10">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Add Blog</h2>
          <p className="text-blue-100 mt-2">
            Fill in the details to add a new Blog
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button className="bg-red-800 text-white">Delete Blog</Button>
          <Button color="warning">Draft</Button>
          <Button onClick={submitBlog}>Save Edit / Post Blog</Button>
        </div>
      </div>

      <div className="w-full py-5 space-y-3">
        <p className="text-2xl font-semibold">Blog Tittle</p>
        <Input
          value={data?.title}
          onValueChange={setTittle}
          className="w-1/3"
          type="text"
          placeholder="blog Tittle"
        />
        <div className="flex items-center gap-2">
          <div
            onClick={() => document?.getElementById("image-upload")?.click()}
            className="flex h-[200px] w-[300px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/70 transition-colors hover:border-primary"
          >
            <div className="flex justify-center items-center gap-5  h-[200px] w-[300px]">
              <svg
                className="h-6 w-6 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">
                Upload Banner
              </span>
            </div>
            <input
              onChange={handleImageUpload}
              id="image-upload"
              type="file"
              className="sr-only h-[200px] w-[300px]"
            />
          </div>
          {banner && (
            <div className="relative aspect-square overflow-hidden rounded-md  h-[400px] w-[550px]">
              <Image
                as={NextImage}
                src={URL.createObjectURL(banner)}
                width={300}
                height={300}
                alt={`Banner Image`}
                isBlurred
                className="object-cover border"
              />
            </div>
          )}
        </div>
      </div>
      {preview ? (
        <div className="max-h-[calc(100vh-200px)] my-10">
          <div className=" bg-gray-300 p-3 rounded-xl flex justify-between items-center my-6">
            <p className="text-xl font-semibold">Preview Of Your Content...</p>
            <Tooltip
              content={<div className="font-semibold ql-flip">Editor</div>}
            >
              <button
                className="action_button"
                onClick={() => setPreview(!preview)}
              >
                <EyeOffIcon />
              </button>
            </Tooltip>
          </div>
          <div
            className=" rounded-xl p-5"
            dangerouslySetInnerHTML={{
              __html: value,
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <div
            id="emojiPicker"
            onClick={() => setEmojiPicker(!emojiPicker)}
            className="absolute top-[66px] right-0 z-50"
          >
            {emojiPicker && (
              <EmojiPicker
                emojiStyle="apple"
                onEmojiSelect={insertEmojiAtCursor}
              />
            )}
          </div>
          <div className="relative">
            <CustomToolbar />
            <Tooltip
              content={<div className="font-semibold ql-flip">Preview</div>}
            >
              <div className="absolute top-[13px] right-[18px] flex justify-center items-center gap-2">
                <Divider className="h-[30px] my-auto " orientation="vertical" />
                <button
                  onClick={() => setPreview(!preview)}
                  className="action_button"
                >
                  <Eye />
                </button>
              </div>
            </Tooltip>
            <ReactQuill
              ref={quillRef}
              className="border rounded-b-lg custom_cursor p-10 bg-gray-200 h-[calc(100Vh-100px)] border-t-black"
              onChange={setValue}
              value={data?.value || value}
              placeholder="Add Main Content of your Blog here..."
              modules={{
                toolbar: {
                  container: "#toolbar",
                },
              }}
            />{" "}
            <Input
              onChange={insertImage}
              multiple
              type="file"
              id="descImg"
              className="sr-only"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
