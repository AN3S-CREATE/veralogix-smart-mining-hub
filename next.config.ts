
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    qualities: [100],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [],
};

export default nextConfig;
