import { DesignToken, ColorValue } from './designToken';

export interface OrdinalScale<DesignTokenType = DesignToken<ColorValue>> {
  primary: DesignTokenType;
  secondary: DesignTokenType;
  tertiary: DesignTokenType;
}

export interface OrdinalVariation<DesignTokenType = DesignToken<ColorValue>> {
  info: DesignTokenType;
  warning: DesignTokenType;
  error: DesignTokenType;
  success: DesignTokenType;
}
