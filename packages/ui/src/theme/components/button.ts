import type * as CSS from 'csstype';
import type { Sizes, WithStates } from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

export type ButtonTheme = {
  variation?: {
    [key in Variations]?: CSS.Properties & WithStates;
  };
  size?: {
    [key in Sizes]?: CSS.Properties & WithStates;
  };
} & CSS.Properties &
  WithStates;
