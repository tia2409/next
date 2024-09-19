/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  // reactStrictMode: true,
  // i18n,
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
