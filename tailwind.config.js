/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        main: '#3C65F5',
        // hover: '#5850EC',
        hover: '#2C4FD8',
        main2: '#E6ECFF',
        main3: '#E0E6F7',
        dark: '#10264E',
      },
      borderRadius: {
        xl: '16px',
        xxl: '20px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 5s ease-in-out',
      },
    }
  },
  // plugins: [
  //   require('flowbite/plugin')  // Add this line
  //   // require('@tailwindcss/forms'),
  // ],
}

