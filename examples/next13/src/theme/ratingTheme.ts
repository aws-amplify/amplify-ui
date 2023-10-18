import { RatingTheme, createComponentTheme } from '@aws-amplify/ui';

const { theme } = createComponentTheme<RatingTheme>({
  theme(tokens) {
    return {
      backgroundColor: tokens.colors.pink[10],
      element: {
        item: {},
        icon: {
          color: tokens.colors.pink[60],
          modifier: {
            filled: {
              color: tokens.colors.pink[60],
            },
            empty: {
              color: tokens.colors.pink[20],
            },
          },
        },
      },
    };
  },
});

export default theme;
