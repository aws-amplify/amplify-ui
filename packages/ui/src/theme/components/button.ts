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

export type ButtonColorThemeVariations =
  | `${'primary' | 'link' | 'outlined'}--${ColorTheme | 'overlay'}`
  | undefined;

export type ButtonTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<
    | Size
    | ButtonColorThemeVariations
    | Variations
    | 'loading'
    | 'fullwidth'
    | 'disabled',
    Required
  > &
  Elements<
    {
      'loader-wrapper'?: BaseProperties;
    },
    Required
  >;
