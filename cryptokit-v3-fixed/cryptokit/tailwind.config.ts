import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#0f1117",
        bg2:     "#181c27",
        bg3:     "#1e2233",
        border:  "rgba(255,255,255,0.08)",
        border2: "rgba(255,255,255,0.14)",
        ink:     "#f0f2f8",
        ink2:    "#8b93b0",
        ink3:    "#5a6180",
        yellow:  "#F0B90B",
        "yellow-dim": "#BA7517",
        green:   "#1D9E75",
        red:     "#E24B4A",
        blue:    "#378ADD",
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "7px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
