import { Modifiers, ComponentStyles, Size, Elements } from './utils';

export type FieldsetTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size | 'outlined' | 'plain', Required> &
  Elements<
    {
      legend?: ComponentStyles & Modifiers<Size, Required>;
    },
    Required
  >;
