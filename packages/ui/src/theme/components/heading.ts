import { ComponentStyles, Modifiers } from './utils';

type Level = '1' | '2' | '3' | '4' | '5' | '6';

export type HeadingTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Level | 'truncated', Required>;
