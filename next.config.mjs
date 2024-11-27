/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
  webpack: (config) => {
    config.resolve.alias["@huggingface/transformers"] = path.resolve(__dirname, "node_modules/@huggingface/transformers");
    return config;
  },
};

export default nextConfig;
