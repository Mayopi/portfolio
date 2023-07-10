/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  daisyui: {
    themes: [
      {
        dark: {
          "base-200": "#181c21",
          primary: "#E23E57",
          secondary: "#00ADB5",
          accent: "#E84545",
          background: "#222831",
          surface: "#393E46",
          error: "#FC5185",
          warning: "#F9DC5C",
          success: "#4CAF50",
          info: "#2196F3",
          text: "#EEEEEE",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
