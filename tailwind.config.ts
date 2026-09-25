import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          DEFAULT: "#ECEEE8",
          dim: "#E1E4D9",
        },
        ink: {
          DEFAULT: "#232B26",
          soft: "#586158",
        },
        saffron: {
          DEFAULT: "#C68A2E",
          dark: "#9C6C21",
        },
        pine: {
          DEFAULT: "#355E56",
          light: "#4C7A70",
        },
        line: "#D7D9CD",
      },
      fontFamily: {
        display: ["var(--font-spectral)", "Georgia", "serif"],
        body: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "80rem",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
