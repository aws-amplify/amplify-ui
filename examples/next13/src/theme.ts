import { createTheme } from '@aws-amplify/ui';
import { stat } from './components/Stat';

export default createTheme({
  name: 'my-theme',
  components: {
    stat,
    wizard(tokens) {
      return {
        backgroundColor: tokens.colors.background.primary,
        modifier: {
          primary: {
            backgroundColor: tokens.colors.background.success,
            fontSize: '20px',
          },
        },
        children: {
          header: {
            backgroundColor: tokens.colors.background.warning,
            color: tokens.colors.font.primary,
          },
        },
      };
    },
    button(tokens) {
      return {
        backgroundColor: tokens.colors.background.success,
        fontSize: tokens.fontSizes.large,
        _hover: {
          backgroundColor: tokens.colors.background.warning,
        },
        modifier: {
          primary: {
            backgroundColor: tokens.colors.background.success,
          },
          'outlined--error': {
            backgroundColor: tokens.colors.pink[20],
          },
        },
      };
    },
  },
  tokens: {
    colors: {
      green: {
        60: '#00f',
      },
    },
  },
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          background: {
            primary: 'grey',
          },
          pink: {
            60: '#f90',
          },
          green: {
            60: '#0f0',
          },
        },
      },
    },
  ],
});
