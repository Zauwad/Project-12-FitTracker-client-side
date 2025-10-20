/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      // keep default themes and then override the 'dark' theme's base color
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme="light"]']
        }
      },
      {
        dark: {
          // Start with daisyui default dark theme and override base-100
          ...require('daisyui/src/theming/themes')['[data-theme="dark"]'],
          'base-100': '#09090B'
        }
      }
    ]
  }
};
