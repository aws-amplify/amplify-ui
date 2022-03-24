export interface TextTokens {
  color: any;
  primary: any;
  secondary: any;
  tertiary: any;
  error: any;
  warning: any;
  success: any;
  info: any;
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
