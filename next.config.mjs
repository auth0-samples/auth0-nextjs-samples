import path from "path";
const __dirname = import.meta.dirname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname, "."),
  },
};

export default nextConfig;
