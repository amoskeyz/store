module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theme: '#98d8ca',
        sec: '#ab7630',
        tomato: '#c61932',
        txt: '#333',
        'txt-fade': '#7e7e7e',
        'txt-lt': '#e7e7e7',
        'txt-lt-fd': '#eee',
        'txt-t': '#777',
        lite: '#f7f7f7',
        bl3: 'rgba(0,0,0,0.3)',
        inherit: 'inherit',
      },
      width: {
        '49/100': '49%',
      },
      fontSize: {
        '2xs': ['0.8125rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        vs: '12em',
        screen: '100vw',
      },
    },
  },
  variants: {
    extend: {
      padding: ['first', 'last'],
      width: ['first'],
    },
  },

  plugins: [],
};
