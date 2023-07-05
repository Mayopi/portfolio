/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        padding: "3.5rem",
        center: true,
      },
    },
  },

  daisyui: {
    themes: [
      {
        dark: {
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
          "text-muted": "#B0B0B0",
          "text-inverse": "#121212",
          "link-primary": "#00ADB5",
          "link-secondary": "#393E46",
          "link-accent": "#F9DC5C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
