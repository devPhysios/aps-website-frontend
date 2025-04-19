/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Raleway, sans-serif"],
      alumni: ["Playfair Display", "serif"],
      alumni2: ["Pacifico", "cursive"],
      poppins: ["Poppins"],
    },
    extend: {
      colors: {
        "aps-green": "#4caf50",
        "aps-orange": "#ff9800",
        "aps-white": "#fff",
      },
    },
  },
  plugins: [],
};
