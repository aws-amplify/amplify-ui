import {
  Modifiers,
  ComponentStyles,
  Elements,
  ColorTheme,
  Size,
} from './utils';

export type SliderFieldTheme<Required extends boolean = false> =
  ComponentStyles &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        label?: ComponentStyles;
        group?: ComponentStyles;
        root?: ComponentStyles &
          Modifiers<'disabled' | 'horizontal' | 'vertical' | Size, Required>;
        track?: ComponentStyles &
          Modifiers<'horizontal' | 'vertical' | Size, Required>;
        range?: ComponentStyles &
          Modifiers<'disabled' | 'horizontal' | 'vertical', Required>;
        thumb?: ComponentStyles & Modifiers<'disabled' | Size, Required>;
      },
      Required
    >;
