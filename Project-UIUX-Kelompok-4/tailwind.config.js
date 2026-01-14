/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        kedua: ['Taprom', 'sans-serif'],
        },
      colors : {
        green : "#00BD1C",
        green2 : "#017A02",
        hitam : "#242424",
        hitam2 : "#7C7C7C",
        putih : "#F0F0F0",
      },
    },
  },
  plugins: [],
}

