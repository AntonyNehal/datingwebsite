// /** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     flowbite.content()
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     flowbite.plugin()
//   ],
// }

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  darkMode: 'class', // Ensure 'class' mode is enabled
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};

