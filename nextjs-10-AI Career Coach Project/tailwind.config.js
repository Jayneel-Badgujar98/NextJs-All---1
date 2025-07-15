// tailwind.config.js
module.exports = {
    darkMode: "class", // ✅ required for next-themes
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    // tailwind.config.js
    theme: {
        extend: {
            colors: {
                muted: "var(--muted)",
            },
        },
    },

  plugins: [],
}
