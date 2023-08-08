import { CSSProperties, ComponentTheme } from './utils';

type Variations = 'info' | 'success';
type Sizes = 'small' | 'large';

export type BadgeTheme = ComponentTheme<
  {
    modifier?: {
      [key in Variations | Sizes]?: CSSProperties;
    };
  } & CSSProperties
>;
