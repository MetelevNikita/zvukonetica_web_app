import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'downloader.disk.yandex.ru' },
    ],
  },
};

export default nextConfig;
