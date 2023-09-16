import { AlertTheme } from './alert';
import { BadgeTheme } from './badge';
import { BreadcrumbsTheme } from './breadcrumbs';
import { ButtonTheme } from './button';
import { CSSProperties, ComponentTheme, WithStates } from './utils';

type BaseComponentTheme = {
  modifier?: Record<string, CSSProperties & WithStates>;
  element?: Record<string, CSSProperties & WithStates>;
} & CSSProperties &
  WithStates;

export { ComponentTheme, BaseComponentTheme };

export type ComponentsTheme = {
  [key: string]: ComponentTheme<BaseComponentTheme>;
  alert?: AlertTheme;
  badge?: BadgeTheme;
  breadcrumbs?: BreadcrumbsTheme;
  button?: ButtonTheme;
};
