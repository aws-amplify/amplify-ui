import { Modifiers, ComponentStyles } from './utils';

export type ToggleButtonTheme<Required extends boolean = false> =
  ComponentStyles & Modifiers<'primary' | 'pressed' | 'link', Required>;

export type ToggleButtonGroupTheme = ComponentStyles;
