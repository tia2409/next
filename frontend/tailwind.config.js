/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    './stories/**/*.{js,jsx,ts,tsx}', // 스토리북 파일
  ],
  theme: {
    extend: {
      // 색상명칭 추가 
      colors: { 
        gray01: '#202020',
        gray02: '#363636',
        gray03: '#505050',
        gray04: '#858585',
        gray05: '#A4A4A4',
        gray06: '#F1F0F1',
        main01: '#0065BD',
        main02: '#1976E5',
        main03: '#989FF1',
        main04: '#E4F2FE',
      },
    },
  },
  plugins: [],
};
