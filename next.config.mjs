/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizeCss: true, optimizePackageImports: ["lucide-react"] },
  compiler: { removeConsole: { exclude: ["error", "warn"] } }
};
export default nextConfig;
