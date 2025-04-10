import axios from "axios";
import { createImageUpload } from "novel";
import toast from "react-hot-toast";
// import { toast } from "sonner";

const onUpload = (file: File) => {

  const formData = new FormData();
  formData.append("image", file); // Append the file to the FormData object
  /* 
    Make a POST request to the ImgBB API with the FormData object.
    You can use the axios library or any other HTTP client library to make the request.
    use any other storage provider like cloudinary, firebase, s3 etc.
    you can also store the image on your own server and return the url.
    you can also send the file to api route and upload image from the backend and return the URL.
  */

  const promise = axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
    formData
  )

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {

        // Successfully uploaded image
        if (res.status === 200) {
          // Get the image URL
          const url = res.data.data.display_url
          // preload the image
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };

        } else if (res.status === 401) {
          resolve(file);
          throw new Error("`Failed to upload image. Please try again.`");
          // Unknown error
        } else {
          throw new Error("Error uploading image. Please try again.");
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        /* @ts-ignore */
        error: (e) => {
          reject(e);
          return e.message;
        },
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
