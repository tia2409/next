/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}", // 스토리북 파일
  ],
  theme: {
    extend: {
      // 색상명칭 추가
      colors: {
        main01: "var(--main01)",
        main02: "var(--main02)",
        main03: "var(--main03)",
        main04: "var(--main04)",
        gray01: "var(--gray01)",
        gray02: "var(--gray02)",
        gray03: "var(--gray03)",
        gray04: "var(--gray04)",
        gray05: "var(--gray05)",
        gray06: "var(--gray06)",
      },
    },
  },
  plugins: [],
};
