"use client";

import { Button, Tooltip } from "@nextui-org/react";
import React, { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EmojiPicker from "@emoji-mart/react";
import { Input } from "@nextui-org/react";
import { Blog } from "@prisma/client";
import axios from "axios";
import { Eye, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./toolbar";

interface BlogFormProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  className?: string;
}

type ChildProps = {};

const Editor: React.FC<BlogFormProps> = ({
  setContent,
  content,
  className,
}) => {
  const quillRef = useRef(null); // Ref for ReactQuill
  // const [content, setContent] = useState<string>(initialData || "");
  const [preview, setPreview] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const insertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      toast.loading("Uploading...");
      const files = e.target.files[0];

      const formData = new FormData();

      formData.append("file", files);

      const response = await axios
        .post("/api/upload/image", formData)
        .then((res) => {
          insertImageAtCursor(res.data.URL);
          toast.dismiss();
          toast.success("Image uploaded", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((e) => {
          console.log(e);
          toast.dismiss();
          toast.error("Failed to upload image. Please try again", {
            position: "top-center",
            duration: 3000,
          });
        });
      return response;
    }
  };

  const insertImageAtCursor = (imgURL: string | null) => {
    if (quillRef.current === null) return;
    /* @ts-ignore */
    const editor = quillRef.current.getEditor(); // Access Quill editor instance
    const range = editor.getSelection(); // Get current cursor position
    if (range) {
      editor.insertEmbed(range.index, "image", imgURL); // Insert image at cursor
      toast.dismiss();
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

  return (
    <div className="">
      <div className="mx-auto ">
        <div className="py-5">
          <div>
            {preview ? (
              <div className="max-h-[calc(100vh-200px)] my-10">
                <div className=" bg-gray-300 p-3 rounded-xl flex justify-between items-center my-6">
                  <p className="text-xl font-semibold">
                    Preview Of Description
                  </p>
                  <Tooltip
                    content={
                      <div className="font-semibold ql-flip">Editor</div>
                    }
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
                  className="w-full rounded-xl p-5"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center px-2 mt-10">
                  <p className="text-2xl font-semibold">Description</p>
                  <Tooltip
                    content={
                      <div className="font-semibold ql-flip">Preview</div>
                    }
                  >
                    <div className=" flex justify-center items-center gap-2">
                      <button
                        onClick={() => setPreview(!preview)}
                        className="action_button"
                      >
                        <Eye />
                      </button>
                    </div>
                  </Tooltip>
                </div>
                <div className="relative">
                  <div
                    id="emojiPicker"
                    onClick={() => setEmojiPicker(!emojiPicker)}
                    className="absolute top-[116px] left-0 z-50"
                  >
                    {emojiPicker && (
                      <EmojiPicker
                        emojiStyle="apple"
                        onEmojiSelect={insertEmojiAtCursor}
                      />
                    )}
                  </div>
                  <CustomToolbar />

                  <ReactQuill
                    value={content}
                    ref={quillRef}
                    className={`border rounded-b-lg p-10 bg-white  ${className}`}
                    onChange={setContent}
                    placeholder="Add Blog Content here..."
                    modules={{
                      toolbar: {
                        container: "#toolbar",
                      },
                    }}
                  />
                  <Input
                    onChange={insertImage}
                    multiple
                    type="file"
                    id="contentImage"
                    className="sr-only"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
