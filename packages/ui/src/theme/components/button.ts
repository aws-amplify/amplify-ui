import type {
  ColorTheme,
  Size,
  Modifiers,
  BaseProperties,
  Elements,
} from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

type ColorThemeVariations =
  | `${Variations | 'outlined'}--${ColorTheme | 'overlay'}`
  | undefined;

export type ButtonTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<
    | Size
    | ColorThemeVariations
    | Variations
    | 'loading'
    | 'fullwidth'
    | 'disabled',
    Required
  > &
  Elements<
    {
      'loader-wrapper': BaseProperties;
    },
    Required
  >;
