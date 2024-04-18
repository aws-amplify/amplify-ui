import { BaseProperties, Modifiers } from './utils';

export interface CardTheme
  extends BaseProperties,
    Modifiers<'elevated' | 'outlined'> {}
