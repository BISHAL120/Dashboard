/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "publicimage1234.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
