/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        bgPink: "#E2A6A6",
        ivory: "#EFEDE1",
        choco: "#6D3F3F",
        lightBrown: "#9E6767",
        lightPink: "#E1B1B1",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
