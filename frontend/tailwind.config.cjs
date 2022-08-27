/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        core: "#F15A24",
        "core-dark": "#E34A1B",
      },
    },
  },
  plugins: [],
};
