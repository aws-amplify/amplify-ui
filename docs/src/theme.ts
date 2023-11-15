import { defaultDarkModeOverride, Theme } from '@aws-amplify/ui-react';

export const baseTheme: Theme = {
  name: 'amplify-docs',
  tokens: {
    colors: {
      teal: {
        10: { value: 'hsl(175, 44%, 96%)' },
        20: { value: 'hsl(175, 57%, 80%)' },
        40: { value: 'hsl(175, 57%, 70%)' },
        60: { value: 'hsl(175, 57%, 40%)' },
        80: { value: 'hsl(181, 69%, 28%)' },
        90: { value: 'hsl(181, 69%, 21%)' },
        100: { value: 'hsl(181, 69%, 15%)' },
      },
    },
  },
  overrides: [defaultDarkModeOverride],
};
