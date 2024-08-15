import { ComponentStyles, Modifiers, Orientation } from './utils';

export type ScrollViewTheme<Required extends boolean = false> =
  ComponentStyles & Modifiers<Orientation, Required>;
