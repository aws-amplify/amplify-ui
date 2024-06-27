import { ComponentStyles, Modifiers } from './utils';

type Levels = '1' | '2' | '3' | '4' | '5' | '6';

export type HeadingTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Levels | 'truncated', Required>;
