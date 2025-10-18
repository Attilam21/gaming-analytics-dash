cat > tailwind.config.cjs <<'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT:"#16a34a", dark:"#0b1020", card:"#111827", accent:"#22c55e" }
      }
    }
  },
  plugins: [],
};
EOF
