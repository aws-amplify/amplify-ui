import { defaultDarkModeOverride } from '@aws-amplify/ui-react';

const theme = {
  name: 'classic-theme',
  primaryColor: 'blue',
  secondaryColor: 'neutral',
  tokens: {
    colors: {
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

export default theme;
