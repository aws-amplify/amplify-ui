import { Modifiers, BaseProperties, Size } from './utils';

export type DividerTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | 'horizontal' | 'vertical', Required>;
