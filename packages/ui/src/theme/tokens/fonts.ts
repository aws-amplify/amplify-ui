import { DesignToken, WebDesignToken, FontValue } from './types/designToken';

type FontKeys = 'variable' | 'static';

export type Fonts = {
  default: {
    [key in FontKeys]: DesignToken<FontValue>;
  };
};

export interface WebFonts {
  default: {
    [key in FontKeys]: WebDesignToken<FontValue>;
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
