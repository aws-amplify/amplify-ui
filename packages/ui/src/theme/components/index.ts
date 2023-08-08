import { AlertTheme } from './alert';
import { BadgeTheme } from './badge';
import { ButtonTheme } from './button';
import { CSSProperties, ComponentTheme, WithStates } from './utils';

type BaseComponentTheme = {
  modifier?: Record<string, CSSProperties & WithStates>;
  children?: Record<string, CSSProperties & WithStates>;
} & CSSProperties &
  WithStates;

export { ComponentTheme, BaseComponentTheme };

export type ComponentsTheme = {
  [key: string]: ComponentTheme<
    {
      modifier?: Record<string, CSSProperties & WithStates>;
      children?: Record<string, CSSProperties & WithStates>;
    } & CSSProperties &
      WithStates
  >;
  alert?: AlertTheme;
  badge?: BadgeTheme;
  button?: ButtonTheme;
};
