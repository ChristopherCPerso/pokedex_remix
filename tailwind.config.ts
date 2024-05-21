import type { Config } from "tailwindcss";
import colors from "./app/utils/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pokeball-bg": "url('/subtract.svg')",
        "pokenav-bg": "url('/pokenav.svg')",
        "ballcard-bg": "url('/ball_card.svg')",
        "evo-bg": "url('/bg_evo.svg')",
      },

      fontFamily: {
        "circularstd-black": ["CircularStd-Black", "sans-serif"],
        "circularstd-blackitalic": ["CircularStd-BlackItalic", "sans-serif"],
        "circularstd-bold": ["CircularStd-Bold", "sans-serif"],
        "circularstd-bolditalic": ["CircularStd-BoldItalic", "sans-serif"],
        "circularstd-book": ["CircularStd-Book", "sans-serif"],
        "circularstd-bookitalic": ["CircularStd-BookItalic", "sans-serif"],
        "circularstd-medium": ["CircularStd-Medium", "sans-serif"],
        "circularstd-mediumitalic": ["CircularStd-MediumItalic", "sans-serif"],
      },

      colors,
    },
  },
  plugins: [],
} satisfies Config;
