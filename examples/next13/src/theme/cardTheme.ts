import { CardTheme, createComponentTheme } from '@aws-amplify/ui';

const { theme } = createComponentTheme<CardTheme>({
  // @ts-ignore
  theme(tokens) {
    return {
      backgroundColor: tokens.colors.pink[100],
      modifier: {
        custom: {
          backgroundColor: tokens.colors.green[10],
        },
      },
    };
  },
});

export default theme;
