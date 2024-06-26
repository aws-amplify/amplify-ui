import {
  Modifiers,
  ComponentStyles,
  Elements,
  ColorTheme,
  Size,
} from './utils';

export type BadgeTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size | ColorTheme, Required> &
  Elements<
    { [key in 'icon' | 'heading' | 'body' | 'dismiss']?: ComponentStyles },
    Required
  >;
