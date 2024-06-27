import { Modifiers, ComponentStyles, ColorTheme, Elements } from './utils';

export type CheckboxTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<ColorTheme | 'disabled', Required> &
  Elements<
    {
      button?: ComponentStyles & Modifiers<'focused' | 'error' | 'disabled'>;
      icon?: ComponentStyles &
        Modifiers<'checked' | 'indeterminate' | 'disabled'>;
      label?: ComponentStyles;
      input?: ComponentStyles;
    },
    Required
  >;
