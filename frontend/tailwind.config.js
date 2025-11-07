/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind scans all your components
  ],
  theme: {
    extend: {
      colors: {
        // Sidebar / buttons
        lincoln: "#265902",          // Solid dark green
        lincoln20: "#26590233",      // Card base color (20% opacity)
        lincoln30: "#2659024D",      // Card hover color (slightly darker)
        lincoln50: "#26590280",      // For subtle backgrounds

        // General UI
        lime: "#98BF0A",
        lime20: "#98BF0A33",
        smoky: "#092601",
        smoky20: "#09260133",
        avocado: "#558C03",
        avocado30: "#558C034D",
        avocado40: "#558C0340",
        background: "#F4F3F8",
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
