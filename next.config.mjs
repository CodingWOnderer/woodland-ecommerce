/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.woodlandworldwide.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.capcons.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.woodlandworldwide.app",
        port: "",
        pathname: "/woodland-images/**",
      },
      {
        protocol: "https",
        hostname: "assets.askatingmonk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
