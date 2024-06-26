import { ComponentStyles, Modifiers } from './utils';

export type CardTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<'elevated' | 'outlined', Required>;
