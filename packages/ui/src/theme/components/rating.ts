import { ComponentStyles, Elements, Modifiers, Size } from './utils';

export type RatingTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size> &
  Elements<
    {
      item?: ComponentStyles;
      icon?: ComponentStyles & Modifiers<'filled' | 'empty'>;
    },
    Required
  >;
