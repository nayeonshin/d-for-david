import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7f8fa",
          100: "#eceff3",
          200: "#d8dde4",
          500: "#7c8593",
          600: "#636d7d",
          700: "#4d5663",
          900: "#1f2530",
        },
        blush: "#f6f7f8",
        ink: "#111111",
        ember: "#8a8f98",
        charcoal: "#2c3138",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
