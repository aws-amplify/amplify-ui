import { DesignToken, ShadowValue, WebDesignToken } from './types/designToken';

type ShadowSize = 'small' | 'medium' | 'large';

export type Shadows = Record<
  ShadowSize,
  DesignToken<ShadowValue> | ShadowValue
>;

export type WebShadows = Record<ShadowSize, WebDesignToken<ShadowValue>>;

export const shadows: Shadows = {
  small: {
    value: {
      offsetX: '0px',
      offsetY: '2px',
      blurRadius: '4px',
      color: '{colors.shadow.tertiary.value}',
    },
  },
  medium: {
    value: {
      offsetX: '0px',
      offsetY: '2px',
      blurRadius: '6px',
      color: '{colors.shadow.secondary.value}',
    },
  },
  large: {
    value: {
      offsetX: '0px',
      offsetY: '4px',
      blurRadius: '12px',
      color: '{colors.shadow.primary.value}',
    },
  },
};
