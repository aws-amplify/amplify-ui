import { defaultDarkModeOverride, Theme } from '@aws-amplify/ui-react';

const flipper = {
  100: 10,
  90: 20,
  80: 40,
  60: 60,
  40: 80,
  20: 90,
  10: 100,
};

const usePalette = (str) => {
  return Object.keys(flipper).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: { value: `{colors.${str}.${curr}.value}` },
    };
  }, {});
};

export const baseTheme: Theme = {
  name: 'amplify-docs',
  overrides: [defaultDarkModeOverride],
};

export const theme: Theme = {
  name: 'amplify-docs',
  overrides: [
    defaultDarkModeOverride,
    {
      selector:
        '[data-amplify-theme-override="classic"] [data-amplify-theme="amplify-docs"]',
      tokens: {
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
        },
        radii: {
          small: { value: '2px' },
          medium: { value: '2px' },
          large: { value: '4px' },
          xl: { value: '6px' },
        },
      },
    },
    {
      selector:
        '[data-amplify-theme-override="terminal"] [data-amplify-theme="amplify-docs"]',
      tokens: {
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
              offsetX: '10px',
              offsetY: '10px',
              spreadRadius: '0px',
              blurRadius: '0',
              color: '{colors.shadow.secondary.value}',
            },
          },
          large: {
            value: {
              offsetX: '8px',
              offsetY: '30px',
              spreadRadius: '10px',
              blurRadius: '0',
              color: '{colors.shadow.primary.value}',
            },
          },
        },
        components: {
          card: {
            boxShadow: { value: '{shadows.medium.value}' },
          },
          heading: {
            1: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
            2: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
            3: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
            4: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
            5: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
            6: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
          },
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
};
