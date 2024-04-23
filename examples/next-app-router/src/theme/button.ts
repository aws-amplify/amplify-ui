import { createComponentTheme } from '@aws-amplify/ui-react/theme';

export const buttonTheme = createComponentTheme({
  name: 'button',
  theme: (tokens) => {
    return {
      _modifiers: {
        primary: {
          backgroundColor: tokens.colors.blue[10],
        },
      },
    };
  },
});
