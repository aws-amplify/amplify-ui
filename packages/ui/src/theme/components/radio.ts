import { ComponentStyles, Elements, Modifiers, Size } from './utils';

export type RadioTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size | 'disabled', Required> &
  Elements<
    {
      input?: ComponentStyles;
      button?: ComponentStyles & Modifiers<Size>;
      label?: ComponentStyles & Modifiers<'disabled'>;
    },
    Required
  >;
