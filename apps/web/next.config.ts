import type { NextConfig } from "next";
const nextConfig: NextConfig = { transpilePackages: ["@anonyverse/shared", "@anonyverse/config", "@anonyverse/validation"], images: { remotePatterns: [{ protocol: "https", hostname: "files.manuscdn.com" }] } };
export default nextConfig;
