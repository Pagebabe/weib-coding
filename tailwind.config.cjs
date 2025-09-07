module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f4f7ff',
          100: '#e8efff',
          200: '#cfe0ff',
          300: '#a6c3ff',
          400: '#6f99ff',
          500: '#3c6bff',
          600: '#264fe0',
          700: '#1f3fb3',
          800: '#1b378f',
          900: '#182f75'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','Inter','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol']
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
