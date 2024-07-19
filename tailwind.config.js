/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        uestc: {
          DEFAULT: '#004098'
        },
        uestc_orange: {
          DEFAULT: '#F08300'
        }
      }
    },
  },
  plugins: [],
}

