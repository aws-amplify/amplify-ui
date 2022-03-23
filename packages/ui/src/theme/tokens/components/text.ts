export interface TextTokens {
  color: never;
  primary: never;
  secondary: never;
  tertiary: never;
  error: never;
  warning: never;
  success: never;
  info: never;
}

export const text: TextTokens = {
  // default styles
  color: { value: '{colors.font.primary.value}' },

  // variations
  primary: {
    color: { value: '{colors.font.primary.value}' },
  },
  secondary: {
    color: { value: '{colors.font.secondary.value}' },
  },
  tertiary: {
    color: { value: '{colors.font.tertiary.value}' },
  },
  error: {
    color: { value: '{colors.font.error.value}' },
  },
  warning: {
    color: { value: '{colors.font.warning.value}' },
  },
  success: {
    color: { value: '{colors.font.success.value}' },
  },
  info: {
    color: { value: '{colors.font.info.value}' },
  },
};
