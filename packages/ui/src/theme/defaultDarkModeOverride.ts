import { ColorModeOverride } from './types';
import { tokens } from './tokens';

/**
 * A basic dark mode that just flips the base color
 * palette.
 */
export const defaultDarkModeOverride: ColorModeOverride = {
  colorMode: 'dark',
  tokens: {
    colors: {
      red: {
        10: { value: tokens.colors.red[100].value },
        20: { value: tokens.colors.red[90].value },
        40: { value: tokens.colors.red[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.red[40].value },
        90: { value: tokens.colors.red[20].value },
        100: { value: tokens.colors.red[10].value },
      },
      orange: {
        10: { value: tokens.colors.orange[100].value },
        20: { value: tokens.colors.orange[90].value },
        40: { value: tokens.colors.orange[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.orange[40].value },
        90: { value: tokens.colors.orange[20].value },
        100: { value: tokens.colors.orange[10].value },
      },
      yellow: {
        10: { value: tokens.colors.yellow[100].value },
        20: { value: tokens.colors.yellow[90].value },
        40: { value: tokens.colors.yellow[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.yellow[40].value },
        90: { value: tokens.colors.yellow[20].value },
        100: { value: tokens.colors.yellow[10].value },
      },
      green: {
        10: { value: tokens.colors.green[100].value },
        20: { value: tokens.colors.green[90].value },
        40: { value: tokens.colors.green[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.green[40].value },
        90: { value: tokens.colors.green[20].value },
        100: { value: tokens.colors.green[10].value },
      },
      teal: {
        10: { value: tokens.colors.teal[100].value },
        20: { value: tokens.colors.teal[90].value },
        40: { value: tokens.colors.teal[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.teal[40].value },
        90: { value: tokens.colors.teal[20].value },
        100: { value: tokens.colors.teal[10].value },
      },
      blue: {
        10: { value: tokens.colors.blue[100].value },
        20: { value: tokens.colors.blue[90].value },
        40: { value: tokens.colors.blue[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.blue[40].value },
        90: { value: tokens.colors.blue[20].value },
        100: { value: tokens.colors.blue[10].value },
      },
      purple: {
        10: { value: tokens.colors.purple[100].value },
        20: { value: tokens.colors.purple[90].value },
        40: { value: tokens.colors.purple[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.purple[40].value },
        90: { value: tokens.colors.purple[20].value },
        100: { value: tokens.colors.purple[10].value },
      },
      pink: {
        10: { value: tokens.colors.pink[100].value },
        20: { value: tokens.colors.pink[90].value },
        40: { value: tokens.colors.pink[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.pink[40].value },
        90: { value: tokens.colors.pink[20].value },
        100: { value: tokens.colors.pink[10].value },
      },
      neutral: {
        10: { value: tokens.colors.neutral[100].value },
        20: { value: tokens.colors.neutral[90].value },
        40: { value: tokens.colors.neutral[80].value },
        // 60 doesn't change
        80: { value: tokens.colors.neutral[40].value },
        90: { value: tokens.colors.neutral[20].value },
        100: { value: tokens.colors.neutral[10].value },
      },

      font: {
        primary: { value: '{colors.white.value}' },
        secondary: { value: '{colors.neutral.100.value}' },
        tertiary: { value: '{colors.neutral.90.value}' },
        inverse: { value: '{colors.neutral.10.value}' },
      },

      background: {
        primary: { value: '{colors.neutral.10.value}' },
        secondary: { value: '{colors.neutral.20.value}' },
        tertiary: { value: '{colors.neutral.40.value}' },
      },

      border: {
        primary: { value: '{colors.neutral.60.value}' },
        secondary: { value: '{colors.neutral.40.value}' },
        tertiary: { value: '{colors.neutral.20.value}' },
      },

      overlay: {
        10: { value: 'hsla(0, 0%, 100%, 0.1)' },
        20: { value: 'hsla(0, 0%, 100%, 0.2)' },
        30: { value: 'hsla(0, 0%, 100%, 0.3)' },
        40: { value: 'hsla(0, 0%, 100%, 0.4)' },
        50: { value: 'hsla(0, 0%, 100%, 0.5)' },
        60: { value: 'hsla(0, 0%, 100%, 0.6)' },
        70: { value: 'hsla(0, 0%, 100%, 0.7)' },
        80: { value: 'hsla(0, 0%, 100%, 0.8)' },
        90: { value: 'hsla(0, 0%, 100%, 0.9)' },
      },
    },
  },
};
