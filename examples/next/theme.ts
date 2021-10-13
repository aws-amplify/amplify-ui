import { createTheme, defaultTheme } from '@aws-amplify/ui-react';

export const theme = createTheme({
  name: 'listings-theme',
  breakpoints: {
    values: {
      large: 50,
    },
  },
  tokens: {
    colors: {
      brand: {
        primary: defaultTheme.tokens.colors.orange,
      },
    },
  },
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          neutral: {
            10: { value: defaultTheme.tokens.colors.neutral[100].value },
            20: { value: defaultTheme.tokens.colors.neutral[90].value },
            40: { value: defaultTheme.tokens.colors.neutral[80].value },
            80: { value: defaultTheme.tokens.colors.neutral[40].value },
            90: { value: defaultTheme.tokens.colors.neutral[20].value },
            100: { value: defaultTheme.tokens.colors.neutral[10].value },
          },
          black: { value: '#fff' },
          white: { value: '#000' },
        },
      },
    },
    {
      breakpoint: 'large',
      tokens: {
        space: {
          small: { value: '1rem' },
          medium: { value: '2rem' },
          large: { value: '3rem' },
        },
      },
    },
  ],
});
