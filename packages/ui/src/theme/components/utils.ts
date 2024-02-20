import type * as CSS from 'csstype';
import { DesignToken } from '../types';
import { WebTokens } from '../tokens';
import { Breakpoints } from '../breakpoints';

export type ColorThemes = 'info' | 'warning' | 'success' | 'error' | 'overlay';

export type Sizes = 'small' | 'large';

export type CSSProperties = {
  [Key in keyof CSS.Properties]: DesignToken | CSS.Properties[Key];
};

export type Selectors = {
  [key in CSS.HtmlAttributes | CSS.Pseudos]?: CSSProperties;
};

export interface BaseThemeDefinition extends Selectors, CSSProperties {
  vars?: Record<string, DesignToken | string>;
  _modifier?: Record<string, BaseThemeDefinition>;
  _element?: Record<string, BaseThemeDefinition>;
}

// This allows a component theme to be a plain object
// that extends from the base component theme OR
// a function that takes the theme's tokens as an argument and returns that same type
export type ComponentTheme<
  ThemeType extends BaseThemeDefinition = BaseThemeDefinition,
  TokensType extends WebTokens = WebTokens,
> = ThemeType | ((tokens: TokensType) => ThemeType) | undefined;

type ComponentThemeOverride<ThemeType> = {
  theme: ThemeType;
  colorMode?: 'light' | 'dark';
  breakpoint?: keyof Breakpoints['values'];
  mediaQuery?: string;
  selector?: string;
};

export type BaseComponentTheme<
  ThemeType extends BaseThemeDefinition = BaseThemeDefinition,
  NameType extends string = string,
  TokensType extends WebTokens = WebTokens,
> = {
  name: NameType;
  theme: ComponentTheme<ThemeType, TokensType>;
  overrides?: Array<
    ComponentThemeOverride<ComponentTheme<ThemeType, TokensType>>
  >;
};
