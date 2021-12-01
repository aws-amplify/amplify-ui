import { DesignToken, WebDesignToken, FontValue } from './types/designToken';

export type Fonts = {
  default: {
    variable: DesignToken<FontValue>;
    static: DesignToken<FontValue>;
  };
};

export interface WebFonts {
  default: {
    [Property in keyof Fonts['default']]: WebDesignToken<FontValue>;
  };
}

// TODO: update the design tokens to use an array
// export interface FontDesignToken {
//   value: Array<string>
// }

export const fonts: Fonts = {
  default: {
    variable: {
      value: `'InterVariable', 'Inter Var', 'Inter', -apple-system, BlinkMacSystemFont,
        'Helvetica Neue', 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans',
        sans-serif`,
    },
    static: {
      value: `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
        'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif`,
    },
  },
};
