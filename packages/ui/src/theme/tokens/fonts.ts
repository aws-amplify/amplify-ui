import {
  DesignTokenValues,
  FontValue,
  OutputVariantKey,
} from './types/designToken';

type FontVariant = 'variable' | 'static';

type BaseFonts<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = {
  default?: DesignTokenValues<FontVariant, FontValue, Output, Platform>;
};

// `Fonts` tokens requires special handling for `required` output due to nested tokens
export type Fonts<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = Output extends 'required' | 'default'
  ? Required<BaseFonts<Output, Platform>>
  : BaseFonts<Output, Platform>;

// TODO: update the design tokens to use an array
// export interface FontDesignToken {
//   value: Array<string>
// }

export const fonts: Fonts<'default'> = {
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
