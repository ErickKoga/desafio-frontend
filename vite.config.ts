import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "APP_") };
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    assetsInclude: ["**/*.otf"],
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: "default",
        },
        include: "**/*.svg",
      }),
    ],
    envPrefix: "APP_",
    server: {
      port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8081,
    },
    preview: {
      port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8081,
    },
  });
};
