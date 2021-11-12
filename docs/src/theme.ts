import { createTheme, defaultTheme } from '@aws-amplify/ui-react';

const flipper = {
  100: 10,
  90: 20,
  80: 40,
  60: 60,
  40: 80,
  20: 90,
  10: 100,
};

export const flipPalette = (obj) => {
  return Object.keys(obj).reduce((acc, curr) => {
    const { value } = obj[curr];
    return {
      ...acc,
      [flipper[curr]]: { value },
    };
  }, {});
};

const usePalette = (str) => {
  return Object.keys(flipper).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: { value: `{colors.${str}.${curr}.value}` },
    };
  }, {});
};

export const theme = createTheme({
  name: 'amplify-docs',
  tokens: {
    colors: {
      border: {
        primary: { value: '{colors.neutral.100.value}' },
      },
    },
    components: {
      heading: {
        1: {
          fontWeight: { value: 800 },
          fontSize: { value: '3rem' },
        },
        2: {
          fontWeight: { value: 600 },
          fontSize: { value: '2.25rem' },
        },
        3: {
          fontWeight: { value: 600 },
          fontSize: { value: '2rem' },
        },
      },
      button: {
        borderColor: { value: '{colors.border.primary.value}' },
        color: { value: '{colors.font.primary.value}' },
        primary: {
          borderWidth: { value: '{borderWidths.small.value}' },
          borderColor: { value: 'transparent' },
        },
      },
      togglebutton: {
        borderColor: { value: '{colors.border.primary.value}' },
        color: { value: '{colors.font.tertiary.value}' },
        pressed: {
          color: { value: '{colors.font.primary.value}' },
          backgroundColor: { value: '{colors.background.secondary.value}' },
        },
      },
      fieldcontrol: {
        lineHeight: { value: 1 },
        color: { value: '{colors.font.primary.value}' },
      },
    },
  },
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          red: flipPalette(defaultTheme.tokens.colors.red),
          orange: flipPalette(defaultTheme.tokens.colors.orange),
          yellow: flipPalette(defaultTheme.tokens.colors.yellow),
          green: flipPalette(defaultTheme.tokens.colors.green),
          teal: flipPalette(defaultTheme.tokens.colors.teal),
          blue: flipPalette(defaultTheme.tokens.colors.blue),
          purple: flipPalette(defaultTheme.tokens.colors.purple),
          pink: flipPalette(defaultTheme.tokens.colors.pink),
          neutral: flipPalette(defaultTheme.tokens.colors.neutral),
          black: { value: '#fff' },
          white: { value: '#000' },

          border: {
            primary: { value: '{colors.neutral.20.value}' },
            secondary: { value: '{colors.neutral.20.value}' },
            tertiary: { value: '{colors.neutral.20.value}' },
          },

          overlay: {
            10: { value: 'hsla(0, 0%, 100%, 0.1)' },
            20: { value: 'hsla(0, 0%, 100%, 0.2)' },
            30: { value: 'hsla(0, 0%, 100%, 0.3)' },
            40: { value: 'hsla(0, 0%, 100%, 0.4)' },
            50: { value: 'hsla(0, 0%, 100%, 0.5)' },
            60: { value: 'hsla(0, 0%, 100%, 0.6)' },
            70: { value: 'hsla(0, 0%, 100%, 0.7)' },
            80: { value: 'hsla(0, 0%, 100%, 0.8)' },
            90: { value: 'hsla(0, 0%, 100%, 0.9)' },
          },
        },
      },
    },
    {
      selector: '[data-amplify-theme="amplify-docs"].classic',
      tokens: {
        fonts: {
          default: {
            variable: { value: `'Open Sans'` },
            static: { value: `'Open Sans'` },
          },
        },
        colors: {
          brand: {
            primary: usePalette('blue'),
            secondary: usePalette('neutral'),
          },
          border: {
            primary: { value: '{colors.neutral.40.value}' },
            secondary: { value: '{colors.neutral.20.value}' },
            tertiary: { value: '{colors.neutral.10.value}' },
          },
          background: {
            success: { value: '{colors.green.80.value}' },
          },
        },
      },
    },
    {
      selector: '[data-amplify-theme="amplify-docs"].artistic',
      tokens: {
        fonts: {
          default: {
            variable: { value: 'Ubuntu' },
            static: { value: 'Ubuntu' },
          },
        },
        colors: {
          green: {
            10: { value: '#C7EFCA' },
            20: { value: '#9AE2A1' },
            40: { value: '#4CCB68' },
            60: { value: '#44AF5B' },
            80: { value: '#31703D' },
            90: { value: '#224226' },
          },
          brand: {
            primary: usePalette('green'),
            secondary: usePalette('green'),
          },
          border: {
            primary: { value: 'black' },
          },
        },
        shadows: {
          small: {
            value: {
              offsetX: '0px',
              offsetY: '2px',
              blurRadius: '4px',
              color: '{colors.shadow.tertiary.value}',
            },
          },
          medium: {
            value: {
              offsetX: '6px',
              offsetY: '6px',
              spreadRadius: '4px',
              blurRadius: '0',
              color: '{colors.shadow.secondary.value}',
            },
          },
          large: {
            value: {
              offsetX: '8px',
              offsetY: '16px',
              spreadRadius: '10px',
              blurRadius: '0',
              color: '{colors.shadow.primary.value}',
            },
          },
        },
        components: {
          button: {
            primary: {
              backgroundColor: { value: '{colors.brand.primary.40.value}' },
              color: { value: '{colors.font.primary.value}' },
              borderColor: { value: '{colors.border.primary.value}' },
            },
          },
        },
        radii: {
          small: { value: '0' },
          medium: { value: '0' },
          large: { value: '0' },
        },
        space: {
          small: { value: '1rem' },
          medium: { value: '1.5rem' },
          large: { value: '2rem' },
        },
        borderWidths: {
          small: { value: '2px' },
          medium: { value: '4px' },
          large: { value: '8px' },
        },
      },
    },
  ],
});
