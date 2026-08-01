/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Design tokens — see README "Design System" for rationale.
        // These resolve through CSS variables (defined in src/styles/index.css)
        // so toggling the `dark` class on <html> re-themes every component
        // that uses them, with no per-component dark: variants needed.
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: {
          DEFAULT: "#4338CA", // indigo — primary interactive accent
          soft: "#EEF0FE",
          bright: "#6D5AF2",
        },
        signal: "#0EA5A0", // teal — reserved for result/success states only
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glass: "0 1px 1px rgba(11,11,15,0.03), 0 8px 24px -8px rgba(11,11,15,0.12)",
        "glass-lg": "0 2px 2px rgba(11,11,15,0.04), 0 24px 48px -16px rgba(11,11,15,0.18)",
        "glass-hover": "0 2px 4px rgba(11,11,15,0.05), 0 32px 64px -20px rgba(67,56,202,0.25)",
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      backdropBlur: {
        glass: "18px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
