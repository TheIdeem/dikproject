/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e2b3f",
        foreground: "#ffffff",
        "accent-green": "#00ff00",
        "accent-red": "#ff0000",
        "accent-yellow": "#ffde00",
        "navbar-bg": "#1e2b3f",
        "footer-bg": "#1e2b3f",
        "box-bg": "#2d3b4f",
        "register-bg": "#85bb00",
      },
    },
  },
  plugins: [],
}; 