/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // 'media' o 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        customBlueTransparent: 'rgba(9, 34, 111, 0.3)',
        customBlue: '#002A56',
        customBluemid: '#006AB5',
        customBluelow: '#003891',
        customSkyBlue: '#0092CD',
        customSkyBluemid: '#b7c8e8',
        customGray: '#a6a7a9',
        customBlack: '#a6a7a9',
        customPink: '#f9355f',
        customYellow: '#CAB881',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Montserrat como fuente sans-serif
        serif: ['Times New Roman', 'serif'], // Times New Roman como fuente serif
      },
    },
  },
  plugins: [
    

  ],
};

export default config;
