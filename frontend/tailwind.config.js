/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        noe: ["Noe Display", "cursive"],
        charter: ["Charter", "serif"],
        gt: ["GT America", "sans-serif"],
      },
    },
  },
  plugins: [],
};
