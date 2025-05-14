import type {
  ColorTheme,
  Size,
  Modifiers,
  ComponentStyles,
  Elements,
} from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

export type ButtonColorThemeVariations = `${'primary' | 'link' | 'outlined'}--${
  | ColorTheme
  | 'overlay'}`;

export type ButtonTheme<Required extends boolean = false> = ComponentStyles &
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
      'loader-wrapper'?: ComponentStyles;
    },
    Required
  >;
