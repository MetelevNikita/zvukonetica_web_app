import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'downloader.disk.yandex.ru' },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Увеличиваем лимит для Base64
    },
  }
};

export default nextConfig;
