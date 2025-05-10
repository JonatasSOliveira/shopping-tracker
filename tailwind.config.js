/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.tsx", 
    "./src/presentation/components/**/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/screens/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/routes/*.{js,jsx,ts,tsx}"
    ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}