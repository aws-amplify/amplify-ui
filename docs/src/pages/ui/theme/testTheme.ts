import { createTheme } from '@aws-amplify/ui-react';

export const testTheme = createTheme({
  name: 'test-theme',
  tokens: {
    colors: {
      neutral: {
        100: { value: 'pink' },
      },
    },
  },
});
