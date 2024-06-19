import type { ColorTheme, Size, Modifiers, BaseProperties } from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

type ColorThemeVariations = `${ColorTheme | 'overlay'}--${Variations}`;

export type ButtonTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | ColorThemeVariations | Variations | 'loading', Required>;
