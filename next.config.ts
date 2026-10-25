import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/`, which GitHub Pages serves.
  output: "export",
  // Emit /pricing/index.html instead of /pricing.html so the host serves clean URLs without rewrite rules.
  trailingSlash: true,
  // The default image optimizer needs a server; static export can't use it.
  images: { unoptimized: true },
  // Cache Components (and Partial Prefetching) are left off on purpose: they turn on Partial Prerendering, which
  // static export does not support.
  turbopack: {
    // Pin the root to this folder (a stray lockfile in a parent folder would otherwise be picked up as the root).
    root: path.join(__dirname),
    rules: {
      "*.css": {
        // Leave CSS Modules alone: `as: "*.css"` would turn them into global CSS and drop their scoped class names.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
