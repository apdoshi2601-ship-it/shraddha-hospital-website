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
        primary: {
          DEFAULT: "#7B2240",
          dark: "#5E1A32",
          light: "#F8EDF1",
        },
        accent: {
          DEFAULT: "#A83258",
          dark: "#8C2849",
        },
        text: {
          DEFAULT: "#2A1A20",
          light: "#6A5560",
          muted: "#9A8A92",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#FBF7F9",
          dark: "#2A1020",
        },
        border: "#EDDFEA",
        whatsapp: "#25D366",
        emergency: "#E74C3C",
        gold: "#C8A660",
      },
      fontFamily: {
        display: ["var(--font-display-family)", "Georgia", "serif"],
        body: ["var(--font-body-family)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(2rem, 5vw, 3.2rem)",
        section: "clamp(1.6rem, 4vw, 2.4rem)",
        card: "clamp(1.15rem, 2vw, 1.25rem)",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.1)",
        primary: "0 4px 16px rgba(123, 34, 64, 0.3)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
