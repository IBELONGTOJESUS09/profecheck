import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf5f6",
          100: "#faebef",
          200: "#f2d5de",
          300: "#e6b0c3",
          400: "#d3809a",
          500: "#bc546f",
          600: "#9e2f4d",
          700: "#7d2540",
          800: "#5f1c31",
          900: "#421424"
        }
      }
    }
  },
  plugins: []
};

export default config;
