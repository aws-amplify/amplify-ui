import type { ColorTheme, Size, Modifiers, BaseProperties } from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

type ColorThemeVariations = `${ColorTheme | 'overlay'}--${Variations}`;

export interface ButtonTheme
  extends BaseProperties,
    Modifiers<Variations | Size | ColorThemeVariations> {}
