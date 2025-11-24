import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                hive: {
                    gold: "#F59E0B", // Honey Gold
                    wax: "#FFFBEB",  // Lighter Beeswax (Amber-50)
                    black: "#020617", // Pure Dark (Slate-950)
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
