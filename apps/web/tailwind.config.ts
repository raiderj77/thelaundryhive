import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}" // Include shared UI
  ],
  theme: {
    extend: {
      colors: {
        hive: {
          primary: "#18181B", // Zinc 900 (Factory Black)
          secondary: "#71717A", // Zinc 500
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