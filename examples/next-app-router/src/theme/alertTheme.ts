import { defineComponentTheme } from '@aws-amplify/ui';

export const alertTheme = defineComponentTheme({
  name: 'alert',
  theme(tokens) {
    const iconVar = 'iconColor';
    const borderVar = 'borderColor';
    return {
      _vars: {
        [iconVar]: tokens.colors.red[60],
        [borderVar]: tokens.colors.border.secondary,
      },
      border: `${tokens.borderWidths.large} solid var(--${borderVar})`,
      _modifiers: {
        info: {
          _vars: {
            [iconVar]: tokens.colors.blue[60],
            [borderVar]: tokens.colors.blue[20],
          },
        },
        success: {
          _vars: {
            [iconVar]: tokens.colors.green[60],
            [borderVar]: tokens.colors.green[20],
          },
        },
        error: {
          _vars: {
            [iconVar]: tokens.colors.red[60],
            [borderVar]: tokens.colors.red[20],
          },
        },
        warning: {
          _vars: {
            [iconVar]: tokens.colors.orange[80],
            [borderVar]: tokens.colors.orange[20],
          },
        },
      },
      _element: {
        icon: {
          color: `var(--${iconVar})`,
        },
      },
    };
  },
});
