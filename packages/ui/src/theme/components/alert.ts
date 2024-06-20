import { createComponentTheme } from '../createTheme';
import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export type AlertTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<ColorTheme, Required> &
  Elements<
    {
      [key in 'icon' | 'heading' | 'body' | 'dismiss']: BaseProperties;
    },
    Required
  >;
