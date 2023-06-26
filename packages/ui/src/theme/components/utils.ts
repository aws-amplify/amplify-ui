import type * as CSS from 'csstype';

export type Variations = 'info' | 'warning' | 'success' | 'error';

export type Sizes = 'small' | 'large';

export type States = '_disabled' | '_hover' | '_active' | '_focus';

export type WithStates = {
  [key in States]?: CSS.Properties;
};
