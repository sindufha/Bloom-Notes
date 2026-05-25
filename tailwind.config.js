export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        cream: "#FFF8E7",
        sunny: "#FFD75A",
        bubblegum: "#FF8FB1",
        mint: "#9BE3B5",
        sky: "#8ECCF2",
        lavender: "#C5B6F0",
        ink: "#0F172A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        blob: "2.25rem",
      },
      boxShadow: {
        cartoon: "6px 6px 0 0 #0F172A",
        "cartoon-sm": "4px 4px 0 0 #0F172A",
        "cartoon-lg": "10px 10px 0 0 #0F172A",
        "cartoon-hover": "2px 2px 0 0 #0F172A",
      },
      borderWidth: {
        3: "3px",
      },
      rotate: {
        "-2": "-2deg",
        2: "2deg",
        "-3": "-3deg",
        3: "3deg",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        bobbing: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "70%": { transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-6px) rotate(1deg)" },
          "75%": { transform: "translateY(4px) rotate(-1deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.6s ease-in-out infinite",
        bobbing: "bobbing 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "pop-in": "pop-in 0.35s ease-out both",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
