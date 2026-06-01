/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Orbitron'", "monospace"],
        body: ["'Inter'", "sans-serif"]
      },
      colors: {
        cyber: {
          50: "#f0fffe",
          100: "#ccfffe",
          200: "#99fffd",
          300: "#52fff9",
          400: "#00f5ef",
          500: "#00d9d4",
          600: "#00adab",
          700: "#008a89",
          800: "#006d6d",
          900: "#005a5a"
        },
        plasma: {
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea"
        }
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00f5ef, 0 0 10px #00f5ef" },
          "100%": { boxShadow: "0 0 20px #00f5ef, 0 0 40px #00f5ef, 0 0 80px #00f5ef" }
        }
      }
    }
  },
  plugins: []
};
