import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  GapValue,
  TextContrast,
} from '../types/designToken';

interface FieldSizeTokens {
  gap: DesignToken<GapValue>;
  fontSize: DesignToken<FontSizeValue>;
}

interface FieldLabelTokens extends TextContrast {}

export interface FieldTokens {
  gap: DesignToken<GapValue>;
  fontSize: DesignToken<FontSizeValue>;
  small: FieldSizeTokens;
  large: FieldSizeTokens;
  label: FieldLabelTokens;
}

export const field: FieldTokens = {
  // default styles
  gap: { value: '{space.xs.value}' },
  fontSize: { value: '{fontSizes.medium.value}' },

  // Adjust base fontSize and gap for small and large sizes
  small: {
    gap: { value: '{space.xxxs.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  large: {
    gap: { value: '{space.small.value}' },
    fontSize: { value: '{fontSizes.large.value}' },
  },

  label: {
    backgroundColor: { value: '{colors.transparent}' },
    color: { value: '{colors.font.secondary.value}' },
  },
};
