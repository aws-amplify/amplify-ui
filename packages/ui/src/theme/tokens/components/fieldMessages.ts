import {
  DesignToken,
  ColorValue,
  FontStyleValue,
  FontSizeValue,
} from '../types/designToken';

interface FieldMessagesErrorTokens {
  color: DesignToken<ColorValue>;
  fontSize: DesignToken<FontSizeValue>;
}

interface FieldMessagesDescriptionTokens {
  color: DesignToken<ColorValue>;
  fontStyle: DesignToken<FontStyleValue>;
  fontSize: DesignToken<FontSizeValue>;
}

export interface FieldMessagesTokens {
  error: FieldMessagesErrorTokens;
  description: FieldMessagesDescriptionTokens;
}

export const fieldmessages: FieldMessagesTokens = {
  error: {
    color: { value: '{colors.font.error.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  description: {
    color: { value: '{colors.font.secondary.value}' },
    fontStyle: { value: 'italic' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
};
