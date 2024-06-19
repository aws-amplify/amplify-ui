import { BaseProperties, Modifiers } from './utils';

export type CardTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<'elevated' | 'outlined', Required>;
