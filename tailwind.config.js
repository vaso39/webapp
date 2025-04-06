/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#FC4747",
        darkBlue: "#10141E",
        lightGrey: "#5A698F",
        lightDark: "#161D2F",
        white : "#FFFFFF"
      },
      fonts: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: {
          light: 200,
          xlight: 300,
          reg: 400,
          med: 500,
          semiB: 600,
          Bold: 700,
        }
      }
    },
  },
  plugins: [],
}

