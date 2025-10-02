import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.output = config.output || {};
      config.output.chunkFilename = '[name].js';
      config.output.hotUpdateChunkFilename = '[id].hot-update.js';
      config.output.hotUpdateMainFilename = '[fullhash].hot-update.json';
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dnglmyclj/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
