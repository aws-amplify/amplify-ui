import { defaultTheme, Theme } from '@aws-amplify/ui-react';
import { flipPalette } from 'utils';

export const theme: Theme = {
  name: 'listings-theme',
  breakpoints: {
    values: {
      large: 50,
    },
  },
  tokens: {
    colors: {
      brand: {
        // primary: usePalette('blue'),
        // secondary: usePalette('red')
      },
      border: {
        // Dark borders
        primary: { value: '{colors.neutral.100.value}' },
        secondary: { value: '{colors.neutral.90.value}' },
        tertiary: { value: '{colors.neutral.60.value}' },
      },
    },
    radii: {
      // Rounded
      // small:  { value: '1rem' },
      // medium: { value: '2rem' },
      // large:  { value: '3rem' },

      // Squared up
      small: { value: '0' },
      medium: { value: '0' },
      large: { value: '0' },
      xl: { value: '0' },
      xxl: { value: '0' },
    },
    space: {
      // extra space
      // xxs:    { value: '0.5rem' },
      // xs:     { value: '0.75rem' },
      // small:  { value: '1rem' },
      // medium: { value: '2rem' },
      // large:  { value: '3rem' }
    },

    // component-specific overrides
    components: {
      card: {
        borderColor: { value: '{colors.brand.primary.60.value}' },
        boxShadow: { value: '{shadows.large.value}' },
      },
    },
  },
  overrides: [
    {
      mediaQuery: 'prefers-reduced-motion',
      tokens: {
        colors: {
          // brand: {
          //   primary: usePalette('pink'),
          //   secondary: usePalette('teal'),
          // }
        },
      },
    },
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
    {
      // maps to breakpoint names:
      breakpoint: 'xl',
      tokens: {
        fontSizes: {
          small: { value: '1rem' },
          medium: { value: '1.125rem' },
          large: { value: '1.75rem' },
          xl: { value: '2.25rem' },
        },
        space: {
          small: { value: '1rem' },
          medium: { value: '2rem' },
          large: { value: '3rem' },
        },
      },
    },
  ],
};
