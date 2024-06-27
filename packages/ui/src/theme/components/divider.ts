import { Modifiers, ComponentStyles, Size } from './utils';

export type DividerTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size | 'horizontal' | 'vertical', Required>;
