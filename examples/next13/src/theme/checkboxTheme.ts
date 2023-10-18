import { CheckboxTheme, createComponentTheme } from '@aws-amplify/ui';

const { theme } = createComponentTheme<CheckboxTheme>({
  theme(tokens) {
    return {
      backgroundColor: tokens.colors.pink[10],
      element: {
        button: {
          backgroundColor: tokens.colors.teal[40],
          '::before': {
            borderColor: tokens.colors.pink[60],
            borderWidth: '5px',
          },
        },
      },
    };
  },
});

export default theme;
