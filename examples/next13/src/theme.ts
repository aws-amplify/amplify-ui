import { createTheme, defaultDarkModeOverride } from '@aws-amplify/ui';
import { stat } from './components/Stat';
import buttonTheme from './theme/buttonTheme';
import card from './theme/cardTheme';
import checkbox from './theme/checkboxTheme';
import rating from './theme/ratingTheme';
import alert from './theme/alertTheme';
import wizardTheme from './theme/wizardTheme';

export default createTheme({
  name: 'my-theme',
  components: {
    alert,
    autocomplete(tokens) {
      return {
        backgroundColor: tokens.colors.pink[60],
        element: {
          menu: {
            backgroundColor: tokens.colors.background.success,
            boxShadow: '0 0 10px black',
            element: {
              option: {
                backgroundColor: tokens.colors.background.success,
                _hover: {
                  backgroundColor: tokens.colors.pink[60],
                },
                modifier: {
                  active: {
                    backgroundColor: tokens.colors.background.error,
                  },
                },
              },
            },
          },
        },
      };
    },
    stat,
    wizard: wizardTheme.theme,
    button: buttonTheme.theme,
    card,
    test: card,
    checkbox,
    rating,
    // card,
    // button(tokens) {
    //   return {
    //     backgroundColor: tokens.colors.background.success,
    //     fontSize: tokens.fontSizes.large,
    //     _hover: {
    //       backgroundColor: tokens.colors.background.warning,
    //     },
    //     modifier: {
    //       primary: {
    //         backgroundColor: tokens.colors.background.success,
    //       },
    //       'outlined--error': {
    //         backgroundColor: tokens.colors.pink[20],
    //       },
    //     },
    //   };
    // },
  },
  // tokens: {
  //   colors: {
  //     green: {
  //       60: '#00f',
  //     },
  //   },
  // },
  overrides: [
    defaultDarkModeOverride,
    // {
    //   colorMode: 'dark',
    //   tokens: {
    //     colors: {
    //       background: {
    //         primary: 'grey',
    //       },
    //       pink: {
    //         60: '#f90',
    //       },
    //       green: {
    //         60: '#0f0',
    //       },
    //     },
    //   },
    // },
  ],
});
