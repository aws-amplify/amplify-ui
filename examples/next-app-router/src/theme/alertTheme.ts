import { createComponentTheme, WebTheme } from '@aws-amplify/ui';

type MyTokens = WebTheme['tokens'] & {
  colors: WebTheme['tokens']['colors'] & {
    hotPink: {
      10: any;
    };
  };
};

export const alertTheme = createComponentTheme({
  name: 'alert',
  theme(tokens: MyTokens) {
    const varName = 'iconColor';
    return {
      _vars: {
        [varName]: tokens.colors.red[60],
      },
      border: `${tokens.borderWidths.small} solid ${tokens.colors.border.secondary}`,
      _modifiers: {
        info: {
          _vars: {
            [varName]: tokens.colors.green[60],
          },
          borderColor: tokens.colors.blue[40],
        },
        success: {
          _vars: {
            [varName]: tokens.colors.green[60],
          },
          // borderColor: tokens.colors.hotPink[10],
        },
      },
      _element: {
        icon: {
          color: `var(--${varName})`,
        },
      },
    };
  },
});
