import { DesignToken, WebDesignToken, ShadowValue } from './types/designToken';

export type Shadows = {
  small: DesignToken<ShadowValue>;
  medium: DesignToken<ShadowValue>;
  large: DesignToken<ShadowValue>;
};

export type WebShadows = {
  [Property in keyof Shadows]: WebDesignToken<ShadowValue>;
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
