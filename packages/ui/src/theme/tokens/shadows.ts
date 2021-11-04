import { DesignToken, WebDesignToken, ShadowValue } from './types/designToken';

type ShadowKeys = 'small' | 'medium' | 'large';

export type Shadows = {
  [key in ShadowKeys]: DesignToken<ShadowValue>;
};

export type WebShadows = {
  [key in ShadowKeys]: WebDesignToken<ShadowValue>;
};

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
