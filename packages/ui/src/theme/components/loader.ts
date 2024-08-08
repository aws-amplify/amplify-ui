import { ComponentStyles, Elements, Modifiers, Size } from './utils';

export type LoaderTheme<Required extends boolean = false> = ComponentStyles &
  Elements<{ label?: ComponentStyles }, Required> &
  Modifiers<Size | 'linear' | 'determinate', Required>;
