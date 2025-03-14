/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0287a8",
        secondary: "#00c3c7",
        dark: "#ffcf22",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
        bai: ["Bai Jamjuree", "sans-serif"], // ✅ เพิ่มฟอนต์ Bai Jamjuree
      },
      animation: {
        'bounce-slow': 'bounce-slow 3s infinite',
        'bounce-alt-slow': 'bounce-alt-slow 3s infinite alternate',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-alt-slow': {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};