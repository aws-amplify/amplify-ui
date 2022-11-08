import { DesignTokenValues, FontValue } from './types/designToken';

type FontVariant = 'variable' | 'static';

export type Fonts<Output = unknown, Platform = unknown> = {
  default?: DesignTokenValues<FontVariant, FontValue, Output, Platform>;
};

// TODO: update the design tokens to use an array
// export interface FontDesignToken {
//   value: Array<string>
// }

export const fonts: Fonts = {
  default: {
    variable: {
      value: `'InterVariable', 'Inter var', 'Inter', -apple-system, BlinkMacSystemFont,
        'Helvetica Neue', 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans',
        sans-serif`,
    },
    static: {
      value: `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
        'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif`,
    },
  },
};
