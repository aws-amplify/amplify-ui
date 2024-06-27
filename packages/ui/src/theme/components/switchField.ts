import { Modifiers, ComponentStyles, Elements, Size } from './utils';

export type SwitchTheme<Required extends boolean = false> = ComponentStyles &
  Elements<
    {
      wrapper?: ComponentStyles &
        Modifiers<'start' | 'end' | 'top' | 'bottom', Required>;
      track?: ComponentStyles &
        Modifiers<'checked' | 'disabled' | 'focused' | 'error'>;
      thumb?: ComponentStyles & Modifiers<'checked' | 'disabled'>;
      label?: ComponentStyles;
    },
    Required
  >;

export type SwitchFieldTheme<Required extends boolean = false> =
  ComponentStyles & Modifiers<Size, Required>;
