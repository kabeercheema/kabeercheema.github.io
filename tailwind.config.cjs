module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter", "ui-sans-serif", "system-ui", "-apple-system",
          "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif",
        ],
        display: [
          "Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif",
        ],
        mono: [
          "JetBrains Mono", "ui-monospace", "SFMono-Regular",
          "Menlo", "Monaco", "Consolas", "monospace",
        ],
      },
      animation: {
        "typing-cursor": "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
