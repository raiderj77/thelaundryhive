import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Disable auto-dark mode based on system preference
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}" // Include shared UI
  ],
  theme: {
    extend: {
      colors: {
        hive: {
          primary: "var(--hive-primary)", // Dynamic Brand Color
          secondary: "#3F3F46", // Zinc 700 (Darker for readability)
          accent: "#2563EB", // Blue 600 (Default Tenant Accent)
          bg: "#FAFAFA", // Zinc 50
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
};
export default config;