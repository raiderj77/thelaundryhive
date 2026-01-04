/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ensure we don't accidentally leak development settings
  reactStrictMode: true,
};

export default nextConfig;
