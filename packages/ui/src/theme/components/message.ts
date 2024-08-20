import { Modifiers, ComponentStyles, Elements, ColorTheme } from './utils';

export type MessageTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<
    'plain' | 'outlined' | 'filled' | ColorTheme | 'neutral',
    Required
  > &
  Elements<
    {
      [key in 'icon' | 'heading' | 'content' | 'dismiss']?: ComponentStyles;
    },
    Required
  >;
