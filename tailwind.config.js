/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ringColor: {
        glow: "#00f", // Blue color for the glow effect
      },
      ringWidth: {
        glow: "4px", // Width of the glow effect
      },
    },
  },
  plugins: [],
};
