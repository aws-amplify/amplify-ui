import { DesignToken } from './types/designToken';

export interface Fonts {
  default: {
    variable: DesignToken;
    static: DesignToken;
  };
}

// TODO: update the design tokens to use an array
// export interface FontDesignToken {
//   value: Array<string>
// }

export const fonts: Fonts = {
  default: {
    variable: {
      value: `'InterVariable', -apple-system, BlinkMacSystemFont,
        'Helvetica Neue', 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans',
        sans-serif`,
    },
    static: {
      value: `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
        'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif`,
    },
  },
};
