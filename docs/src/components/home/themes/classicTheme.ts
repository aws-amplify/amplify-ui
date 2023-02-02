import { defaultDarkModeOverride } from '@aws-amplify/ui-react';

const classicTheme = {
  name: 'classic-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: '{colors.blue.10}' },
          20: { value: '{colors.blue.20}' },
          40: { value: '{colors.blue.40}' },
          60: { value: '{colors.blue.60}' },
          80: { value: '{colors.blue.80}' },
          90: { value: '{colors.blue.90}' },
          100: { value: '{colors.blue.100}' },
        },
        secondary: {
          10: { value: '{colors.neutral.10}' },
          20: { value: '{colors.neutral.20}' },
          40: { value: '{colors.neutral.40}' },
          60: { value: '{colors.neutral.60}' },
          80: { value: '{colors.neutral.80}' },
          90: { value: '{colors.neutral.90}' },
          100: { value: '{colors.neutral.100}' },
        },
      },
      border: {
        primary: { value: '{colors.neutral.40}' },
        secondary: { value: '{colors.neutral.20}' },
        tertiary: { value: '{colors.neutral.10}' },
      },
    },
    radii: {
      small: { value: '2px' },
      medium: { value: '2px' },
      large: { value: '4px' },
      xl: { value: '6px' },
    },
  },
  overrides: [defaultDarkModeOverride],
};

export default classicTheme;
