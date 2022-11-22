import { ColorModeOverride } from './types';
import { ReactNativeTokens, tokens } from './tokens';

const darkModeTokens = {
  colors: {
    red: {
      10: tokens.colors.red[100],
      20: tokens.colors.red[90],
      40: tokens.colors.red[80],
      // 60 doesn't change
      80: tokens.colors.red[40],
      90: tokens.colors.red[20],
      100: tokens.colors.red[10],
    },
    orange: {
      10: tokens.colors.orange[100],
      20: tokens.colors.orange[90],
      40: tokens.colors.orange[80],
      // 60 doesn't change
      80: tokens.colors.orange[40],
      90: tokens.colors.orange[20],
      100: tokens.colors.orange[10],
    },
    yellow: {
      10: tokens.colors.yellow[100],
      20: tokens.colors.yellow[90],
      40: tokens.colors.yellow[80],
      // 60 doesn't change
      80: tokens.colors.yellow[40],
      90: tokens.colors.yellow[20],
      100: tokens.colors.yellow[10],
    },
    green: {
      10: tokens.colors.green[100],
      20: tokens.colors.green[90],
      40: tokens.colors.green[80],
      // 60 doesn't change
      80: tokens.colors.green[40],
      90: tokens.colors.green[20],
      100: tokens.colors.green[10],
    },
    teal: {
      10: tokens.colors.teal[100],
      20: tokens.colors.teal[90],
      40: tokens.colors.teal[80],
      // 60 doesn't change
      80: tokens.colors.teal[40],
      90: tokens.colors.teal[20],
      100: tokens.colors.teal[10],
    },
    blue: {
      10: tokens.colors.blue[100],
      20: tokens.colors.blue[90],
      40: tokens.colors.blue[80],
      // 60 doesn't change
      80: tokens.colors.blue[40],
      90: tokens.colors.blue[20],
      100: tokens.colors.blue[10],
    },
    purple: {
      10: tokens.colors.purple[100],
      20: tokens.colors.purple[90],
      40: tokens.colors.purple[80],
      // 60 doesn't change
      80: tokens.colors.purple[40],
      90: tokens.colors.purple[20],
      100: tokens.colors.purple[10],
    },
    pink: {
      10: tokens.colors.pink[100],
      20: tokens.colors.pink[90],
      40: tokens.colors.pink[80],
      // 60 doesn't change
      80: tokens.colors.pink[40],
      90: tokens.colors.pink[20],
      100: tokens.colors.pink[10],
    },
    neutral: {
      10: tokens.colors.neutral[100],
      20: tokens.colors.neutral[90],
      40: tokens.colors.neutral[80],
      // 60 doesn't change
      80: tokens.colors.neutral[40],
      90: tokens.colors.neutral[20],
      100: tokens.colors.neutral[10],
    },

    font: {
      primary: '{colors.white}',
      secondary: '{colors.neutral.100}',
      tertiary: '{colors.neutral.90}',
      inverse: '{colors.neutral.10}',
    },

    background: {
      primary: '{colors.neutral.10}',
      secondary: '{colors.neutral.20}',
      tertiary: '{colors.neutral.40}',
    },

    border: {
      primary: '{colors.neutral.60}',
      secondary: '{colors.neutral.40}',
      tertiary: '{colors.neutral.20}',
    },

    overlay: {
      10: 'hsla(0, 0%, 100%, 0.1)',
      20: 'hsla(0, 0%, 100%, 0.2)',
      30: 'hsla(0, 0%, 100%, 0.3)',
      40: 'hsla(0, 0%, 100%, 0.4)',
      50: 'hsla(0, 0%, 100%, 0.5)',
      60: 'hsla(0, 0%, 100%, 0.6)',
      70: 'hsla(0, 0%, 100%, 0.7)',
      80: 'hsla(0, 0%, 100%, 0.8)',
      90: 'hsla(0, 0%, 100%, 0.9)',
    },
  },
};

/**
 * A basic dark mode that just flips the base color
 * palette.
 */
export const defaultDarkModeOverride: ColorModeOverride = {
  colorMode: 'dark',
  tokens: darkModeTokens,
};

export const reactNativeDarkTokens: ReactNativeTokens<'optional'> = {
  ...darkModeTokens,
};
