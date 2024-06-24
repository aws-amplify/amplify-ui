import { Modifiers, BaseProperties } from './utils';

export type TextVariation =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type TextTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<TextVariation | 'truncated', Required>;
