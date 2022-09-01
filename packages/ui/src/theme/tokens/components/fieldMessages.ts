import {
  DesignToken,
  ColorValue,
  FontStyleValue,
  FontSizeValue,
  TextContrast,
} from '../types/designToken';

interface FieldMessagesErrorTokens extends TextContrast {
  fontSize: DesignToken<FontSizeValue>;
}

interface FieldMessagesDescriptionTokens extends TextContrast {
  fontStyle: DesignToken<FontStyleValue>;
  fontSize: DesignToken<FontSizeValue>;
}

export interface FieldMessagesTokens {
  error: FieldMessagesErrorTokens;
  description: FieldMessagesDescriptionTokens;
}

export const fieldmessages: FieldMessagesTokens = {
  error: {
    backgroundColor: { value: '{colors.transparent}' },
    color: { value: '{colors.font.error.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  description: {
    backgroundColor: { value: '{colors.transparent}' },
    color: { value: '{colors.font.secondary.value}' },
    fontStyle: { value: 'italic' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
};
