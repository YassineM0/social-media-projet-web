/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        width: '8px', // Width of the scrollbar
        track: 'rgba(0,0,0,0.1)', // Track color
        thumb: '#0000', // Thumb color
        hoverThumb: '#6755e3', // Thumb color on hover
      },
      spacing: {
        0.5: "0.7rem",
        1: "2rem",
        1.25: "2.9rem",
        1.3: "3.1rem",
        1.5: "3.4rem",
        2: "4rem",
        2.5: "5rem",
        3: "6rem",
        4: "9rem",
        4.05: "11rem",
        4.25: "14rem",
        4.5: "16rem",
        5: "19rem",
        5.25: "20rem",
        5.5: "22rem",
        6: "23rem",
        7: "27rem",
        8: "33rem",
        9: "40rem",
        9.5 : "42rem",
        10: "46rem",
        x: "40rem",
        xx: "50rem",
        z: "69.7rem",
        xxx: "75rem",
        it: "0.9rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        "extra-bold": "800",
        black: "900",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",

        blue: "#538DD7",
        blueHover: "rgba(83, 141, 215, 0.5)",
        darkBlue: "#183153",
        gray1: "#616D8A",
        gray2: "#B7BDC9",
        gray3: "#E0E0F0",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#E6E8F0",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        hero: "#D9D9D9",
        kolchi: "#f0fdf4",
        ldrsm: "#167a3c",

        tn: "#94a3b8",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Oswald", "sans-serif"],
        body: ['"Open Sans"', "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "1.1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "3.3rem",
        "7xl": "5rem",
      },
      padding: {
        1: "0.2rem",
        1.15: "0.4rem",
        1.5: "0.6rem",
        2: "1rem",
        2.05: "1.5rem",
        2.15: "2rem",
        2.25: "2.3rem",
        2.27: "2.7rem",
        2.5: "3rem",
        3: "4rem",
        3.5: "5rem",
        4: "6rem",
        5: "9rem",
        6: "12rem",
        6.5: "16rem",
        7: "23rem",
      },
      margin: {
        0.5: "0.2rem",
        0.7: "0.4rem",
        1: "0.8rem",
        1.25: "1rem",
        1.5: "2rem",
        2: "3rem",
        3: "4rem",
        3.5 : "6rem",
        4: "9rem",
        5: "12rem",
        6: "17rem",
        7: "21rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        DEFAULT: "4px",
        md: "0.3rem",
        mdd: "1rem",
        semilg: "2rem",
        lg: "5rem",
        xlg: "7rem",
        llg: "0.5rem",
        lllg: "1rem",
        full: "9999px",
        large: "12px",
        full: "100%",
      },
      height: {
        95: "95%",
        1: "2.1rem",
        10: "2.5rem",
      },
      width: {
        95: "95%",
        1: "2.1rem",
      },
    },
  },
  plugins: [],
};
