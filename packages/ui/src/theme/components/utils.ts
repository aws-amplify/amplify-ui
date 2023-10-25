import type * as CSS from 'csstype';
import { DesignToken, WebTheme } from '../types';

export type ColorThemes = 'info' | 'warning' | 'success' | 'error' | 'overlay';

export type Sizes = 'small' | 'large';

export type Selectors = {
  [key in CSS.HtmlAttributes | CSS.Pseudos]?: CSSProperties;
};

export type CSSProperties = {
  [key in keyof CSS.Properties]: DesignToken | string;
} & {
  vars?: Record<string, DesignToken | string>;
};

export type BaseThemeDefinition = Selectors & CSSProperties;

export type BaseComponentTheme = {
  modifier?: Record<string, BaseComponentTheme>;
  element?: Record<string, BaseComponentTheme>;
} & BaseThemeDefinition;

export type ComponentTheme<
  ThemeType extends BaseComponentTheme = BaseComponentTheme
> = ThemeType | ((tokens: WebTheme['tokens']) => ThemeType) | undefined;
