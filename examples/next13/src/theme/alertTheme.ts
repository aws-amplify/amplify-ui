import { AlertTheme, createComponentTheme } from '@aws-amplify/ui';

const { theme } = createComponentTheme<AlertTheme>({
  theme(tokens) {
    const varName = 'iconColor';
    return {
      vars: {
        [varName]: tokens.colors.red[60],
      },
      border: `${tokens.borderWidths.small} solid ${tokens.colors.border.secondary}`,
      modifier: {
        info: {
          vars: {
            [varName]: tokens.colors.blue[60],
          },
          borderColor: tokens.colors.blue[40],
        },
        success: {
          vars: {
            [varName]: tokens.colors.green[60],
          },
          borderColor: tokens.colors.green[40],
        },
      },
      element: {
        icon: {
          color: `var(--${varName})`,
        },
      },
    };
  },
});

const { theme: darkTheme } = createComponentTheme<AlertTheme>({
  theme(tokens) {
    return {
      borderWidth: '10px',
      borderColor: 'white',
    };
  },
});

export { theme, darkTheme };

export default theme;
