import { AlertTheme } from './alert';
import { BadgeTheme } from './badge';
import { ButtonTheme } from './button';
import { CSSProperties, ComponentTheme } from './utils';

export type ComponentsTheme = {
  alert?: AlertTheme;
  badge?: BadgeTheme;
  button?: ButtonTheme;
  [key: string]: ComponentTheme<
    {
      variation?: Record<string, CSSProperties>;
      size?: Record<string, CSSProperties>;
      children?: Record<string, CSSProperties>;
      colorTheme?: Record<string, CSSProperties>;
    } & CSSProperties
  >;
};
