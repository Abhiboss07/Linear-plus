/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                linear: {
                    bg: "#08090A",
                    sidebar: "#121314",
                    border: "#262729",
                    hover: "#1E1F21",
                    text: "#F2F3F5",
                    subtext: "#8A8F98",
                }
            },
        },
    },
    plugins: [],
};
