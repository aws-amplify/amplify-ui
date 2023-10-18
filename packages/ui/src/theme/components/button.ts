import type {
  ColorThemes,
  Sizes,
  ComponentTheme,
  BaseThemeDefinition,
  BaseComponentTheme,
} from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

type ColorThemeVariations = `${ColorThemes}--${Variations}`;

export type ButtonTheme = ComponentTheme<
  {
    modifier?: {
      [key in Variations | Sizes | ColorThemeVariations]?: BaseThemeDefinition;
    };
  } & BaseComponentTheme
>;
