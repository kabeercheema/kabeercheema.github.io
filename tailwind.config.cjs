module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter", "ui-sans-serif", "system-ui", "-apple-system",
          "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif",
        ],
        mono: [
          "JetBrains Mono", "ui-monospace", "SFMono-Regular",
          "Menlo", "Monaco", "Consolas", "monospace",
        ],
      },
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--text-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
