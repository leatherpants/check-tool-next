import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'big-stone': { //big-stone
          '50': '#f3f6fc',
          '100': '#e7eef7',
          '200': '#c9daee',
          '300': '#99bbe0',
          '400': '#6398cd',
          '500': '#3f7bb8',
          '600': '#2e619b',
          '700': '#264e7e',
          '800': '#234369',
          '900': '#223958',
          '950': '#17263c',
        },
        'primary': { //fuchsia-pink
          '50': '#fcf7fc',
          '100': '#f9eef9',
          '200': '#f2dcf2',
          '300': '#e7c0e7',
          '400': '#d89ad6',
          '500': '#c06bbd',
          '600': '#a653a1',
          '700': '#894284',
          '800': '#70386b',
          '900': '#5d3258',
          '950': '#3b1737',
        },
        'east-bay': { //east-bay
          '50': '#f3f6fb',
          '100': '#e3eaf6',
          '200': '#cddcf0',
          '300': '#abc4e5',
          '400': '#83a7d7',
          '500': '#6589cc',
          '600': '#5271be',
          '700': '#475fae',
          '800': '#3f4f8e',
          '900': '#3c4b7d',
          '950': '#252b46',
        },



      },
      fontFamily: {
        'print': ["Times New Roman", 'Times', 'serif'],
        'print-mono': ["Courier New", "Courier", 'monospace'],
      }
    },
  },
  plugins: [],
};
export default config;
