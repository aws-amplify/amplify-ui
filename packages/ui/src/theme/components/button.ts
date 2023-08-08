import type { Sizes, WithStates, CSSProperties, ComponentTheme } from './utils';

type Variations =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'warning'
  | 'menu'
  | 'link';

export type ButtonTheme = ComponentTheme<
  {
    modifier?: {
      [key in Variations | Sizes]?: CSSProperties & WithStates;
    };
  } & CSSProperties &
    WithStates
>;
