/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {};
=======
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  },
};
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab

export default nextConfig;
