/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com" , "raw.githubusercontent.com"],
    unoptimized: true,
  },
};

export default nextConfig;
