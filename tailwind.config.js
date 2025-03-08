/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // dark mód engedélyezése
  theme: {
    extend: {
      colors: {
        'crypto-blue': '#1DA1F2',
        'crypto-green': '#17BF63',
        'crypto-purple': '#9C27B0',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@headlessui/react'),
  ],
}