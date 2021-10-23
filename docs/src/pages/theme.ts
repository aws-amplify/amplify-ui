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
          fontWeight: { value: 900 },
          fontSize: { value: '3rem' },
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
        // paddingBlockStart: { value: '{space.xs.value}' },
        // paddingBlockEnd: { value: '{space.xs.value}' },
        // paddingInlineStart: { value: '{space.xs.value}' },
        // paddingInlineEnd: { value: '{space.xs.value}' },
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
        },
      },
    },
  ],
});
