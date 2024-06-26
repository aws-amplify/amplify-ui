import { Modifiers, ComponentStyles } from './utils';

export type TextVariation =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type TextTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<TextVariation | 'truncated', Required>;
