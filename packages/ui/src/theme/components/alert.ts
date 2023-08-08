import { CSSProperties, ComponentTheme } from './utils';

type Variations = 'info' | 'success';

export type AlertTheme = ComponentTheme<
  {
    modifier?: {
      [key in Variations]?: CSSProperties;
    };
  } & CSSProperties
>;
