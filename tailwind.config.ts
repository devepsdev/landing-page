import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Naranja de la marca: solo para botones, enlaces y cifras
        secondary: "#f5741c",
        // Fondo de la página (casi negro, un punto azulado) y superficie de tarjetas
        fondo: "#0b0c16",
        darkBg: "#14152a",
        // Lila: solo en luces y degradados suaves
        lila: "#7b61ff",
      },
    },
  },
  plugins: [],
};
export default config;
