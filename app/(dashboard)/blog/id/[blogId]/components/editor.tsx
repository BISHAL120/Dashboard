"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { z } from "zod";

import { NotificationType } from "@/Constants/notificationType";
import EmojiPicker from "@emoji-mart/react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { Eye, EyeOffIcon, Trash } from "lucide-react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./toolbar";
import { Blog } from "@prisma/client";
import { deleteBlogById, draftBlogById } from "@/action/getBlogs";
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

interface BlogFormProps {
  initialData: Blog | null;
  id: string;
}

const Editor: React.FC<BlogFormProps> = ({ initialData, id }) => {
  const router = useRouter();
  const quillRef = useRef(null); // Ref for ReactQuill
  const [tittle, setTittle] = useState<string>(initialData?.title || "");
  const [banner, setBanner] = useState<string>(initialData?.banner || "");
  const [thumbnail, setThumbnal] = useState(initialData?.thumb || {});
  const [temBanner, setTemBanner] = useState<File | null>(null);
  const [content, setContent] = useState<string>(initialData?.value || "");

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const Tittle = initialData ? "Edit Blog" : "Create Blog";
  const description = initialData
    ? "Let's Edit The Blog"
    : "Fill in the details to add a new Blog";
  const SuccessMessage = initialData ? "Blog updated." : "Blog created.";
  const LoadingMessage = initialData ? "updating Blog ..." : "creating Blog...";
  const action = initialData ? "Update changes" : "Create";

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setTemBanner(file);
    }
  };

  const draftBlog = async () => {
    await draftBlogById(id);
    router.push("/blog/all");
    toast.success("Blog saved as draft", {
      icon: "😐",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  const deleteBlog = async () => {
    toast.loading("Deleting Blog...");
    if (initialData) {
      const res = await deleteBlogById({
        id,
        Filename: initialData?.thumb.Filename,
        url: initialData?.thumb.url,
      }).then((res) => {
        if (res?.success) {
          toast.dismiss();
          router.push("/blog/all");
          toast.success("Blog deleted successfully", {
            icon: "🥲",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.dismiss();
          toast.error("Failed to delete blog", {
            icon: "🥲",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
    }
  };
  async function PublishedBlog() {
    switch (true) {
      case !tittle:
        toast.error("Please enter tittle", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case !temBanner && !banner:
        toast.error("Please upload banner", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case !content:
        toast.error("Please enter blog content", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case content === "<p><br></p>":
        toast.error("Please enter blog content", {
          position: "top-center",
          duration: 3000,
        });
        return;
    }

    try {
      setLoading(true);
      toast.loading(LoadingMessage, {
        position: "top-center",
      });
      // Upload thumbnail and handle the result with await
      let bannerURL = banner;
      let thumb = thumbnail;

      if (temBanner) {
        const res = await handleThumbnailUpload(temBanner);
        if (!res) {
          throw new Error("Failed to upload thumbnail"); // Error if the upload fails
        }
        bannerURL = res.url; // Update banner URL after successful upload
        thumb = res;
      }

      // Create blog data
      const blogData = {
        tittle: tittle, // Assuming tittle is correct (fix spelling if needed)
        value: content,
        banner: bannerURL,
        Thumbnail: thumb,
        author: "Demo User",
        published: true, // TODO: Replace with actual user
      };

      if (initialData) {
        const response = await axios.put("/api/upload/blog", {
          ...blogData,
          id,
        });

        if (response.status === 200) {
          toast.dismiss();
          toast.success(SuccessMessage, {
            position: "top-center",
            duration: 3000,
          });
        }
        await axios
          .post("/api/notification", {
            message: "Blog Ungraded",
            type: NotificationType.BlogUpdated,
            userId: "Demo User", // TODO: Replace with actual user
            referId: response.data.data.id,
          })
          .then(() => {
            setLoading(false);
            router.push("/blog/all");
            router.refresh();
          });
      } else {
        const response = await axios.post("/api/upload/blog", blogData);
        if (response.status === 200) {
          toast.dismiss();
          toast.success(SuccessMessage, {
            position: "top-center",
            duration: 3000,
          });
        }
        await axios
          .post("/api/notification", {
            message: "New Blog Added",
            type: NotificationType.BlogCreated,
            userId: "Demo User", // TODO: Replace with actual user
            referId: response.data.data.id,
          })
          .then(() => {
            router.push("/blog/all");
            router.refresh();
            setLoading(false);
          });
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.dismiss();
      toast.error(error?.response?.data.message, {
        position: "top-center",
        duration: 3000,
      });
      console.error("Catch error", error);
    }
  }
  async function PostBlog() {
    switch (true) {
      case !tittle:
        toast.error("Please enter tittle", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case !temBanner && !banner:
        toast.error("Please upload banner", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case !content:
        toast.error("Please enter blog content", {
          position: "top-center",
          duration: 3000,
        });
        return;
      case content === "<p><br></p>":
        toast.error("Please enter blog content", {
          position: "top-center",
          duration: 3000,
        });
        return;
    }

    try {
      setLoading(true);
      toast.loading(LoadingMessage, {
        position: "top-center",
      });
      // Upload thumbnail and handle the result with await
      let bannerURL = banner;
      let thumb = thumbnail;

      if (temBanner) {
        const res = await handleThumbnailUpload(temBanner);
        if (!res) {
          throw new Error("Failed to upload thumbnail"); // Error if the upload fails
        }
        bannerURL = res.url; // Update banner URL after successful upload
        thumb = res;
      }

      // Create blog data
      const blogData = {
        tittle: tittle, // Assuming tittle is correct (fix spelling if needed)
        value: content,
        banner: bannerURL,
        Thumbnail: thumb,
        author: "Demo User", // TODO: Replace with actual user
      };

      if (initialData) {
        const response = await axios.put("/api/upload/blog", {
          ...blogData,
          id,
        });

        if (response.status === 200) {
          toast.dismiss();
          toast.success(SuccessMessage, {
            position: "top-center",
            duration: 3000,
          });
        } else {
          console.log(response);
        }
        await axios
          .post("/api/notification", {
            message: "Blog Ungraded",
            type: NotificationType.BlogUpdated,
            userId: "Demo User", // TODO: Replace with actual user
            referId: response.data.data.id,
          })
          .then(() => {
            setLoading(false);
            router.push("/blog/all");
            router.refresh();
          });
      } else {
        const response = await axios.post("/api/upload/blog", blogData);
        if (response.status === 200) {
          toast.dismiss();
          toast.success(SuccessMessage, {
            position: "top-center",
            duration: 3000,
          });
        }
        await axios
          .post("/api/notification", {
            message: "New Blog Added",
            type: NotificationType.BlogCreated,
            userId: "Demo User", // TODO: Replace with actual user
            referId: response.data.data.id,
          })
          .then(() => {
            router.push("/blog/all");
            router.refresh();
            setLoading(false);
          });
      }
    } catch (error: any) {
      setLoading(false);
      toast.dismiss();
      toast.error(error?.response?.data.message, {
        position: "top-center",
        duration: 3000,
      });
      console.log("Catch error", error);
    }
  }
  const handleThumbnailUpload = async (file: File) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const result = await axios.post("/api/upload/blog/thumbnail", formData);

        return result.data.banner;
      } catch (err) {
        console.error(err);
        toast.dismiss();
        toast.error("Image upload failed", {
          position: "top-center",
          duration: 3000,
        });
        return null; // Return null in case of failure
      }
    }
  };

  const ChangeThumbnail = async () => {
    // 1. delete the photo from thr s3
    // 2. delete the photo from the database
    // 3.upload new image to the s3
    // 4. update the photo in the database

    try {
      toast.loading("Image Deleting...");
      const fileName = initialData?.thumb.Filename;

      await axios.post("/api/upload/blog/thumbnail/delete", {
        fileName,
        id,
      });
      toast.dismiss();
      router.refresh();
      toast.success("Image deleted successfully", {
        position: "top-center",
        duration: 3000,
      });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.response?.data.message, {
        position: "top-center",
        duration: 3000,
      });
      console.error("Catch error", error);
    }
  };

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
      {/* sticky top-[80px] z-10 */}
      <div className=" bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between ">
          <div>
            <h2 className="text-3xl font-bold text-white">{Tittle}</h2>
            <p className="text-blue-100 mt-2">{description}</p>
          </div>
          <div className="flex justify-end gap-2">
            {initialData && (
              <div>
                <AlertDialog>
                  <AlertDialogTrigger className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-slate-800 text-white">
                    Delete Blog
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        Database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-800 "
                        onClick={() => deleteBlog()}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
            {initialData?.published == true ? (
              <Button
                onClick={draftBlog}
                disabled={loading}
                className="bg-warning-700 text-white"
              >
                Draft
              </Button>
            ) : (
              <Button
                onClick={PublishedBlog}
                disabled={loading}
                color="success"
              >
                Published
              </Button>
            )}
            <Button disabled={loading} onClick={PostBlog}>
              {action}
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto ">
        <div className="py-5">
          <div className=" space-y-8">
            <p className="text-2xl font-semibold">Blog Tittle</p>
            <Input
              value={tittle}
              onValueChange={setTittle}
              size="lg"
              variant="faded"
              height={100}
              color="primary"
              className="w-full mb-5"
              placeholder="Enter Blog Tittle"
            />
            <div>
              {initialData && initialData?.banner !== "" ? (
                <div className=" w-full rounded-md overflow-hidden my-10 p-1">
                  <p className="text-2xl font-semibold mb-4">Blog Thumbnail</p>

                  <div className="relative w-[500px] h-[500px]">
                    <Image
                      as={NextImage}
                      src={banner}
                      alt="Preview"
                      width={500}
                      height={500}
                      className="bg-gray-100 rounded-xl object-contain h-[400px] w-[400px] border"
                    />
                    <Button
                      onPress={onOpen}
                      className="z-10 absolute top-2 right-2 py-5 hover:bg-red-500 hover:border-white hover:text-white"
                      type="button"
                      variant="faded"
                      size="sm"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Are you sure?
                            </ModalHeader>
                            <ModalBody>
                              <p>
                                This action cannot be undone. This will
                                permanently delete your Blog and remove your
                                data from our database.
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                              >
                                Close
                              </Button>
                              <Button
                                onClick={ChangeThumbnail}
                                color="primary"
                                onPress={onClose}
                              >
                                Confirm
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                </div>
              ) : (
                <div>
                  {temBanner ? (
                    <div className="relative w-[500px] h-[500px]">
                      <Image
                        as={NextImage}
                        src={URL.createObjectURL(temBanner)}
                        alt="Preview"
                        width={500}
                        height={500}
                        className="bg-gray-100 rounded-xl object-contain h-[400px] w-[400px] border"
                      />
                      <Button
                        onPress={onOpen}
                        className="z-10 absolute top-0 right-2 py-5 hover:bg-red-500 hover:border-white hover:text-white"
                        type="button"
                        variant="faded"
                        size="sm"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1">
                                Are you sure?
                              </ModalHeader>
                              <ModalBody>
                                <p>
                                  This action cannot be undone. This will
                                  permanently delete your Blog and remove your
                                  data from our database.
                                </p>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="default"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  onClick={() => setTemBanner(null)}
                                  color="danger"
                                  onPress={onClose}
                                >
                                  Confirm
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        document?.getElementById("image-upload")?.click()
                      }
                      className="flex h-[400px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/70 transition-colors hover:border-primary"
                    >
                      <input
                        onChange={handleThumbnail}
                        id="image-upload"
                        type="file"
                        className="sr-only h-[400px] w-full"
                      />
                      <div className="flex justify-center items-center gap-5 ">
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
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            {preview ? (
              <div className="max-h-[calc(100vh-200px)] my-10">
                <div className=" bg-gray-300 p-3 rounded-xl flex justify-between items-center my-6">
                  <p className="text-xl font-semibold">
                    Preview Of Your Content...
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
                  <p className="text-2xl font-semibold">Blog Content</p>
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
                    className="border rounded-b-lg custom_cursor p-10 h-[calc(100Vh-100px)] border-t-black"
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
