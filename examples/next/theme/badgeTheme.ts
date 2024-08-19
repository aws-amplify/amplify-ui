import { defineComponentTheme } from '@aws-amplify/ui-react/server';

export const badgeTheme = defineComponentTheme({
  name: 'badge',
  theme: (tokens) => {
    return {
      padding: tokens.space.large,
      _modifiers: {
        success: {
          color: tokens.colors.blue[20],
        },
      },
    };
  },
  overrides: [
    {
      colorMode: 'dark',
      theme: (tokens) => {
        return {
          _modifiers: {
            success: {
              color: tokens.colors.blue[20],
            },
          },
        };
      },
    },
  ],
});
