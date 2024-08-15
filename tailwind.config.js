/** @type {import('tailwindcss').Config} */
import {
  shade,
  rounded,
  animations,
  components,
  palettes,
} from "@tailus/themer";



module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
  ],
  theme: {
    extend: {

      colors: ({ colors }) => ({
        ...palettes.spring,
      }),

    },
  },

  plugins: [
    rounded,
    shade,
    components,
    animations
  ],
};