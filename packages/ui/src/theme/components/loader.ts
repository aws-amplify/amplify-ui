import { BaseProperties, Elements, Modifiers, Size } from './utils';

export type LoaderTheme<Required extends boolean = false> = BaseProperties &
  Elements<{ label?: BaseProperties }, Required> &
  Modifiers<Size, Required>;
