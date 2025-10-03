import type { NextConfig } from 'next';
import type { Configuration as WebpackConfiguration } from 'webpack';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack: (config: WebpackConfiguration, { isServer }) => {
    if (isServer) {
      const output = config.output ?? {};

      config.output = {
        ...output,
        chunkFilename: '[name].js',
        hotUpdateChunkFilename: '[id].hot-update.js',
        hotUpdateMainFilename: '[fullhash].hot-update.json',
      };
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
