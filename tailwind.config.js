module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                main: "var(--main-color)",
                sub: "var(--sub-color)",
                bg: "var(--bg-color)",
                subalt: "var(--sub-alt-color)",
                text: "var(--text-color)",
            },
        },
    },
    plugins: [],
};
