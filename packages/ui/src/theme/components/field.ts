import { Modifiers, ComponentStyles, Size, Elements } from './utils';

export type FieldTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size, Required> &
  Elements<
    {
      description?: ComponentStyles;
      'error-message'?: ComponentStyles;
      'show-password'?: ComponentStyles & Modifiers<'error', Required>;
    },
    Required
  >;
