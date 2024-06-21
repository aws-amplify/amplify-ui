import { Modifiers, BaseProperties, FieldControlModifiers } from './utils';

export type InputTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<FieldControlModifiers, Required>;
