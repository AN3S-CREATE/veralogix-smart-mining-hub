import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["https://6000-firebase-studio-1765529117518.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev"]
    }
  },
};

export default nextConfig;
