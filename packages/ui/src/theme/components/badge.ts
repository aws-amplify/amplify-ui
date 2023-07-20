import { CSSProperties, ComponentTheme } from './utils';

type Variations = 'info' | 'success';
type Sizes = 'small' | 'large';

export type BadgeTheme = ComponentTheme<
  {
    variation?: {
      [key in Variations]?: CSSProperties;
    };
    size?: {
      [key in Sizes]?: CSSProperties;
    };
  } & CSSProperties
>;
