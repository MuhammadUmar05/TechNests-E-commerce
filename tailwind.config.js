/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#057aff", // Custom primary color (blue-800)
        primary2: "#f0f6ff", // Custom primary color (blue-800)
        primary3: "#021431",
        secondary: "#a78bfa", // Custom secondary color (purple-600)
        accent: "#FACC15", // Custom accent color (yellow-400)
        background: "#e8e8e8", // Light gray background
        dark: "#272935",
        dark_secondary: "#181920",
        dark_3: "#414558"
      },
      screens: {
        "x-sm": "480px", // Adjust to your desired value
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: []
  },
}
