/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'],
     darkMode: 'class',
     theme: {
          colors: {
               dark: '#1c1c1c',
               'dark-2': '#232323',
               'dark-3': '#313131',
          },
          extend: {},
     },
     plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')],
};
