import type * as CSS from 'csstype';

type Variations = 'info' | 'success';
type Sizes = 'small' | 'large';

export type BadgeTheme = {
  variation?: {
    [key in Variations]?: CSS.Properties;
  };
  size?: {
    [key in Sizes]?: CSS.Properties;
  };
} & CSS.Properties;
