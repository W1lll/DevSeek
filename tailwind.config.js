module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './_includes/**/*.{js,ts,jsx,tsx}', './_layouts/**/*.{js,ts,jsx,tsx}'],
    enabled: true,
    options: {
      safelist: ['dark', 'light'], //specific classes
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    typography: (theme) => ({}),
    extend: {
      'animation': {
        'gradient-x':'gradient-x 4s ease infinite',
        'gradient-y':'gradient-y 15s ease infinite',
        'gradient-xy':'gradient-xy 15s ease infinite',
      },
      'keyframes': {
        'gradient-y': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'center top'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'center center'
          }
        },
        'gradient-x': {
            '0%, 100%': {
                'background-size':'200% 200%',
                'background-position': 'left center'
            },
            '50%': {
                'background-size':'200% 200%',
                'background-position': 'right center'
            }
        },
        'gradient-xy': {
            '0%, 100%': {
                'background-size':'400% 400%',
                'background-position': 'left center'
            },
            '50%': {
                'background-size':'200% 200%',
                'background-position': 'right center'
            }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
