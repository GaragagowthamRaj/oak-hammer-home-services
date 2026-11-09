import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211c",
        forest: "#234237",
        "forest-deep": "#14241e",
        moss: "#3f6b54",
        brass: "#8d7040",
        "brass-soft": "#e6d3ad",
        paper: "#f3efe7",
        mist: "#e6e1d6",
        line: "#d8d1c4",
        muted: "#5c6560",
        danger: "#8d3b32",
        card: "#fffcf8",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 32px -26px rgba(23, 33, 28, 0.55)",
        lift: "0 18px 44px -28px rgba(23, 33, 28, 0.6)",
      },
      maxWidth: {
        site: "1180px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
