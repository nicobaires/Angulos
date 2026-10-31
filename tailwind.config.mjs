/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        angle: {
          neutral: '#2563eb', // Azul Geometría
          agudo: '#f59e0b',   // Ámbar
          recto: '#10b981',   // Esmeralda
          obtuso: '#8b5cf6',  // Violeta
          llano: '#ec4899',   // Rosa
          concavo: '#06b6d4', // Cian
          completo: '#3b82f6' // Azul vivo
        }
      },
      minHeight: {
        touch: '44px'
      },
      minWidth: {
        touch: '44px'
      }
    }
  },
  plugins: []
};
