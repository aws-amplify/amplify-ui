import { Modifiers, ComponentStyles, Elements, ColorTheme } from './utils';

export type AlertTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<ColorTheme, Required> &
  Elements<
    {
      [key in 'icon' | 'heading' | 'body' | 'dismiss']?: ComponentStyles;
    },
    Required
  >;
