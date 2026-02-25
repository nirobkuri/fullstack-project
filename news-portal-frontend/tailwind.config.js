/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        primary: "#C1121F",
        dark: "#0D0D0D",
        surface: "#161616",
        muted: "#2A2A2A",
        accent: "#F4A522",
        light: "#F5F0EB",
      },
    },
  },
  plugins: [],
}
