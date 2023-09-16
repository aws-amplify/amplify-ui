import type {
  ColorThemes,
  Sizes,
  WithStates,
  CSSProperties,
  ComponentTheme,
} from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

type ColorThemeVariations = `${ColorThemes}--${Variations}`;

// Make this a reusable type so customers can do
// createComponentTheme<ComponentTheme<{
//   modifier?: {
//     [key in Variations | Sizes | ColorThemeVariations]?: CSSProperties &
//       WithStates;
//   };
// }
export type ButtonTheme = ComponentTheme<
  {
    modifier?: {
      [key in Variations | Sizes | ColorThemeVariations]?: CSSProperties &
        WithStates;
    };
  } & CSSProperties &
    WithStates
>;
