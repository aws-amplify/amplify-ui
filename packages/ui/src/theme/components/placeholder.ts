import { Modifiers, ComponentStyles, Size } from './utils';

export type PlaceholderTheme<Required extends boolean = false> =
  ComponentStyles & Modifiers<Size, Required>;
