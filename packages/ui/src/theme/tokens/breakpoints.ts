export interface Breakpoints {
  values: {
    base: number;
    small: number;
    medium: number;
    large: number;
    xl: number;
    xxl: number;
  };
  unit: string;
  defaultBreakpoint: string;
}

export const breakpoints: Breakpoints = {
  values: {
    base: 0,
    small: 30, // 480px (16px base)
    medium: 48, // 768px
    large: 62, // 992px
    xl: 80, // 1280px
    xxl: 96, // 1536px
  },
  unit: 'em',
  defaultBreakpoint: 'base',
};
