import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.svg", "logo.svg", "icons.svg"],

      manifest: {
        id: "/",
        name: "CampusLink Maps",
        short_name: "Maps",
        description:
          "Find your way around Strathmore. Search buildings, check real-time room schedules, and get step-by-step navigation to your next class.",
        theme_color: "#3F7A5C",
        background_color: "#F5F1E8",
        display: "standalone",
        orientation: "any",
        categories: ["education", "navigation", "utilities"],
        start_url: "/",
        screenshots: [
          {
            src: "/screenshots/mobile.png",
            sizes: "884x1574",
            type: "image/png",
            form_factor: "narrow",
            label: "Navigate to your next class",
          },
          {
            src: "/screenshots/desktop.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "wide",
            label: "Campus map on desktop",
          },
        ],

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2}"],
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.hostname === "api.campuslink.online",
            handler: "NetworkOnly",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
