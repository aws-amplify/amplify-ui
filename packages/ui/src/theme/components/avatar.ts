import {
  Modifiers,
  ComponentStyles,
  Elements,
  ColorTheme,
  Size,
} from './utils';

export type AvatarTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size | ColorTheme | 'filled' | 'outlined', Required> &
  Elements<
    {
      icon?: ComponentStyles;
      image?: ComponentStyles;
      loader?: ComponentStyles;
    },
    Required
  >;
