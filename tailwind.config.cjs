/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", {
            kwenza: {
                "primary": "#09bc8a",
                "secondary": "#0891b2",
                "accent": "#fcab10",
                "neutral": "#38bdf8",
                "base-100": "#f5f5f4",
                "info": "#3b82f6",
                "success": "#a3e635",
                "warning": "#fca5a5",
                "error": "#d53d3d",
            },
        },],
    },
}
