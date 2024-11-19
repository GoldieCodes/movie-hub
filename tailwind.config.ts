import type { Config } from "tailwindcss"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pt-serif": ["var(--PTSerif)"],
        outfit: ["var(--Outfit)"],
        "josefin-sans": ["var(--JosefinSans)"],
      },
    },
  },
  plugins: [],
} satisfies Config
