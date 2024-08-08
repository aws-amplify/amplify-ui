import { Modifiers, ComponentStyles, FieldControlModifiers } from './utils';

export type TextareaTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<FieldControlModifiers, Required>;
