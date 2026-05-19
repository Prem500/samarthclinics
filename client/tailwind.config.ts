import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f766e",
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0e7490",
          50: "#ecfeff",
          100: "#cffafe",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          foreground: "#ffffff",
        },
        clinical: {
          50: "#f4f7f9",
          100: "#e8eef3",
          200: "#d1dce6",
          300: "#a8bccf",
          400: "#7899b3",
          500: "#557a96",
          600: "#426178",
          700: "#364f62",
          800: "#2f4353",
          900: "#2a3947",
          950: "#1c2632",
        },
        gold: {
          DEFAULT: "#b8956c",
          light: "#d4c4a8",
          dark: "#8a6e47",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#0f766e",
        background: "#f8faf9",
        foreground: "#0f172a",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        display: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        premium:
          "0 4px 6px -1px rgba(15, 38, 50, 0.06), 0 12px 24px -4px rgba(15, 38, 50, 0.08)",
        "premium-lg":
          "0 10px 15px -3px rgba(15, 38, 50, 0.08), 0 24px 48px -12px rgba(15, 38, 50, 0.12)",
        "inner-soft": "inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 40% 20%, rgba(20, 184, 166, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14, 116, 144, 0.06) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(184, 149, 108, 0.06) 0px, transparent 45%)",
        "gradient-clinical": "linear-gradient(135deg, #0f766e 0%, #0e7490 45%, #115e59 100%)",
        "gradient-hero-overlay":
          "linear-gradient(180deg, rgba(12, 28, 42, 0.72) 0%, rgba(15, 39, 58, 0.78) 45%, rgba(10, 22, 35, 0.85) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
