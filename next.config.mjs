/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3000'
  }
};

export default nextConfig;
