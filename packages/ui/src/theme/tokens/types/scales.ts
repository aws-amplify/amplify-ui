import { DesignToken } from './designToken';

export type OrdinalScaleKeys = 'primary' | 'secondary' | 'tertiary';
export type OrdinalVariationKeys = 'info' | 'error' | 'warning' | 'success';

export interface OrdinalScale<ValueType = any> {
  primary: DesignToken<ValueType>;
  secondary: DesignToken<ValueType>;
  tertiary: DesignToken<ValueType>;
}

export interface OrdinalVariation<ValueType = any> {
  info: DesignToken<ValueType>;
  warning: DesignToken<ValueType>;
  error: DesignToken<ValueType>;
  success: DesignToken<ValueType>;
}
