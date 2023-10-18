import { createComponentTheme } from '@aws-amplify/ui';

const wizardTheme = createComponentTheme({
  name: 'wizard',
  theme(tokens) {
    return {
      backgroundColor: tokens.colors.background.primary,
      modifier: {
        primary: {
          backgroundColor: tokens.colors.background.success,
          fontSize: '20px',
        },
      },
      element: {
        header: {
          backgroundColor: tokens.colors.background.warning,
          color: tokens.colors.font.primary,
        },
      },
    };
  },
});

export default wizardTheme;
