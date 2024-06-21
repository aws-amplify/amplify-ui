import { Modifiers, BaseProperties, FieldControlModifiers } from './utils';

export type TextareaTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<FieldControlModifiers, Required>;
