/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@huggingface/transformers"],
  },
};

export default nextConfig;
