import { Modifiers, ComponentStyles, FieldControlModifiers } from './utils';

export type InputTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<FieldControlModifiers, Required>;
