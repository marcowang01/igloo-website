/** @type {import('next').NextConfig} */
const nextConfig = {
  // Toggled to false because useEffect triggers twice under strict mode
  reactStrictMode: false,
  images: {
    // disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
