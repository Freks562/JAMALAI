const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  compiler: { removeConsole: { exclude: ["error", "warn"] } }
};
export default nextConfig;
