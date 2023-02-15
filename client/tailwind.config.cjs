/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f0f2f5',
        dimBlack: '#4b4c4f',
        dimGray: '#8a8d91',
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '900px',
        md: '1060px',
        lg: '1200px',
        xl: '1700px',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '6xl': '4.632rem',
        '7xl': '5.232rem',
        '8xl': '6.132rem',
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
      backgroundImage: {
        'post-bg-one': "url('../public/assets/post-bg-one.jpg')",
        'post-bg-two': "url('../public/assets/post-bg-two.jpg')",
        'post-bg-three': "url('../public/assets/post-bg-three.jpg')",
        'post-bg-four': "url('../public/assets/post-bg-four.jpg')",
      },
      width: {
        pfp: '48px',
      },
    },
  },
  plugins: [],
};
