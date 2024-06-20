import { Modifiers, BaseProperties } from './utils';

export type ToggleButtonTheme<Required extends boolean = false> =
  BaseProperties & Modifiers<'primary' | 'pressed' | 'link', Required>;

export type ToggleButtonGroupTheme<Required extends boolean = false> =
  BaseProperties;
