const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ["./js/**/*.jsx", "../lib/**/*.html.eex"],
  },
}
