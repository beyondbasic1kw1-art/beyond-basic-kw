import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px", // Slightly wider for modern desktops
      },
    },
    extend: {
      /* -----------------------------------------------------
         🎨 BEYOND BASIC Brand Palette
      ------------------------------------------------------ */
      colors: {
        bbDark: "#221F1D",     // Deep Charcoal (main brand)
        bbGray: "#404040",     // Medium Gray (neutral tone)
        bbOlive: "#8F8163",    // Warm Taupe / Olive accent
        bbSoftGold: "#F9F5F2", // Off-white / background

        // System color tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },

      /* -----------------------------------------------------
         ✍️ Typography (English + Arabic)
      ------------------------------------------------------ */
      fontFamily: {
        mollies: ["Mollies", "serif"],      // English display font (Headings)
        iwan: ["Iwan Zaza", "serif"],       // Arabic display font (RTL headings)
        inter: ["Inter", "sans-serif"],     // Body & general text
      },

      fontSize: {
        /* Elegant responsive scale inspired by the brand presentation */
        "display-lg": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }], // ~72px
        "display-md": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }], // ~56px
        "display-sm": ["2.75rem", { lineHeight: "1.2" }], // ~44px
        xl: ["1.5rem", { lineHeight: "1.4" }], // ~24px
        lg: ["1.25rem", { lineHeight: "1.6" }], // ~20px
        base: ["1rem", { lineHeight: "1.8" }], // ~16px
        sm: ["0.875rem", { lineHeight: "1.8" }], // ~14px
      },

      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.03em",
      },

      /* -----------------------------------------------------
         🟡 Border Radius System
      ------------------------------------------------------ */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* -----------------------------------------------------
         ✨ Animations & Keyframes
      ------------------------------------------------------ */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.45s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
