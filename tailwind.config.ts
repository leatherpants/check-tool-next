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
        'primary': { //big-stone
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

      },
    },
  },
  plugins: [],
};
export default config;
