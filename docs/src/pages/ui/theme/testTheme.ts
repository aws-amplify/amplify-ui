import { createTheme } from '@aws-amplify/ui-react';

export const testTheme = createTheme({
  tokens: {
    colors: {
      neutral: {
        100: { value: 'pink' },
      },
      // font: {
      //   primary: { value: 'blue'}
      // }
    },
  },
});
