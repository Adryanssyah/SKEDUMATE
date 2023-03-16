/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'],
     darkMode: 'class',
     theme: {
          extend: {},
     },
     plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')],
};
