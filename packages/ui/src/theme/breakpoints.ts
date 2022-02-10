export interface Breakpoints {
  values: {
    base: number;
    small: number;
    medium: number;
    large: number;
    xl: number;
    xxl: number;
  };
  defaultBreakpoint: string;
}

// Breakpoint unit is in pixels
export const breakpoints: Breakpoints = {
  values: {
    base: 0,
    small: 480, // breakpoint unit is px
    medium: 768,
    large: 992,
    xl: 1280,
    xxl: 1536,
  },
  defaultBreakpoint: 'base',
};
