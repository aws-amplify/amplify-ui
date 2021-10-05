import { DesignToken } from './types/designToken';

export interface Breakpoints {
  values: {
    base: DesignToken;
    small: DesignToken;
    medium: DesignToken;
    large: DesignToken;
    xl: DesignToken;
    xxl: DesignToken;
  };
  unit: DesignToken;
  defaultBreakpoint: DesignToken;
}

export const breakpoints: Breakpoints = {
  values: {
    base: { value: 0 },
    small: { value: 30 }, // 480px (16px base)
    medium: { value: 48 }, // 768px
    large: { value: 62 }, // 992px
    xl: { value: 80 }, // 1280px
    xxl: { value: 96 }, // 1536px
  },
  unit: {
    value: 'em',
  },
  defaultBreakpoint: {
    value: 'base',
  },
};
