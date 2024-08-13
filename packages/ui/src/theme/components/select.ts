import {
  Modifiers,
  ComponentStyles,
  Elements,
  Size,
  FieldControlModifiers,
} from './utils';

export type SelectTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<FieldControlModifiers | 'expanded', Required> &
  Elements<
    {
      wrapper?: ComponentStyles;
      icon?: ComponentStyles & Modifiers<Size, Required>;
    },
    Required
  >;
