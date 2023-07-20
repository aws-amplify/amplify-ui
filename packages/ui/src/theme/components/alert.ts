import { CSSProperties } from './utils';

type Variations = 'info' | 'success';

export type AlertTheme = {
  variation?: {
    [key in Variations]?: CSSProperties;
  };
} & CSSProperties;
