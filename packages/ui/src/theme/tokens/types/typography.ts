import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  FontWeightValue,
} from './designToken';

export interface TypographyTokens {
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
  color: DesignToken<ColorValue>;
}
