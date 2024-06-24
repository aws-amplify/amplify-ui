import { BaseProperties, Modifiers, Orientation } from './utils';

export type ScrollViewTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Orientation, Required>;
