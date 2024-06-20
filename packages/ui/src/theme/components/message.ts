import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export type MessageTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<'plain' | 'outlined' | ('filled' & ColorTheme), Required> &
  Elements<
    {
      [key in 'icon' | 'heading' | 'content' | 'dismiss']?: BaseProperties;
    },
    Required
  >;
