import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#3c3836",
        input: "#3c3836", // bg1, same as accent
        ring: "hsl(25 5.3% 50.0%)", // Same as muted foreground
        background: "#1d2021", // bg0_h
        foreground: "#F9F5D7",
        primary: {
          DEFAULT: "#d79921",
          foreground: "#282828",
        },
        secondary: {
          DEFAULT: "#98971a",
          foreground: "#282828",
        },
        success: {
          DEFAULT: "#b8bb26",
          foreground: "hsl(60 9.1% 97.8%)",
        },
        destructive: {
          DEFAULT: "#cc241d",
          foreground: "hsl(60 9.1% 97.8%)",
        },
        muted: {
          DEFAULT: "#282828",
          foreground: "hsl(25 5.3% 50.0%)",
        },
        accent: {
          DEFAULT: "#3c3836", // bg1
          foreground: "#ebdbb2",
        },
        popover: {
          DEFAULT: "#282828",
          foreground: "#ebdbb2",
        },
        card: {
          DEFAULT: "#282828",
          foreground: "#ebdbb2",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

