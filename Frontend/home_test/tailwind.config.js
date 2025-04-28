/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',  // Ini buat App Router Next.js
      './pages/**/*.{js,ts,jsx,tsx}', // Kalau kamu masih pakai Pages Router
      './components/**/*.{js,ts,jsx,tsx}', // Semua komponen
    ],
    theme: {
      extend: {},
      screens: { // Ini buat responsive
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    plugins: [],
  }
  