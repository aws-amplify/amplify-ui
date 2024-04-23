import { createTheme } from '@aws-amplify/ui-react/theme';
import { buttonTheme } from './buttonTheme';
import { alertTheme } from './alertTheme';
import { avatarTheme } from '@/components/Avatar';
import { badgeTheme } from './badgeTheme';

export const theme = createTheme({
  name: 'my-theme',
  components: [buttonTheme, alertTheme, avatarTheme, badgeTheme],
  tokens: {
    space: {
      xxxxxxxxl: '20rem',
    },
    components: {
      badge: {
        paddingHorizontal: '{space.xxxxxxxxl}',
      },
    },
    colors: {
      font: {
        success: 'red',
      },
      hotPink: {
        10: '#0f0',
      },
    },
  },
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          font: {
            primary: '{colors.white}',
          },
          background: {
            primary: '{colors.neutral.100}',
            tertiary: '{colors.neutral.80}',
          },
        },
      },
    },
    {
      breakpoint: 'large',
      tokens: {
        space: {
          medium: '2rem',
        },
      },
    },
  ],
});
