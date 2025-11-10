import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ここが超重要：このプロジェクトフォルダをトレースの起点に固定
  outputFileTracingRoot: path.join(__dirname),

  // React版/本体を確実にトランスパイル対象に
  transpilePackages: ["@openai/chatkit", "@openai/chatkit-react"],
};

export default nextConfig;
