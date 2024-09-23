/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://172.22.7.252:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
