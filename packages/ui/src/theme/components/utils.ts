import type * as CSS from 'csstype';
import { DesignToken } from '../types';
import { WebTokens } from '../tokens';
import { Breakpoints } from '../breakpoints';

export type ColorTheme = 'info' | 'warning' | 'success' | 'error';

export type Size = 'small' | 'large';

export type CSSProperties = {
  [Key in keyof CSS.Properties]:
    | DesignToken<CSS.Properties[Key]>
    | CSS.Properties[Key];
};

export type Selectors = {
  [key in CSS.HtmlAttributes | CSS.Pseudos]?: CSSProperties;
};

export interface BaseProperties extends CSSProperties, Selectors {
  _vars?: Record<string, DesignToken | string>;
  _css?: Record<string, CSSProperties & Selectors>;
}

export type Modifiers<
  Keys extends string = string,
  Required extends boolean = false,
> = Required extends true
  ? {
      _modifiers: { [key in Keys]: BaseProperties };
    }
  : {
      _modifiers?: { [key in Keys]?: BaseProperties };
    };

// This type assumes all elements have the same shape
// but some elements could have different modifiers
export type Elements<
  Keys extends string = string,
  Required extends boolean = false,
  Properties extends BaseProperties = BaseProperties,
> = Required extends true
  ? {
      _element: {
        [key in Keys]: Properties;
      };
    }
  : {
      _element?: {
        [key in Keys]?: Properties;
      };
    };

export interface BaseTheme extends CSSProperties, Selectors {
  _vars?: Record<string, DesignToken | string>;
  _css?: Record<string, CSSProperties & Selectors>;
  _modifiers?: Record<string, BaseProperties>;
  _element?: Record<
    string,
    BaseProperties & {
      _modifiers?: Record<string, BaseProperties>;
    }
  >;
}

// This allows a component theme to be a plain object
// that extends from the base component theme OR
// a function that takes the theme's tokens as an argument and returns that same type
export type ComponentTheme<
  ThemeType extends BaseTheme = BaseTheme,
  TokensType extends WebTokens = WebTokens,
> = ThemeType | ((tokens: TokensType) => ThemeType);

export type ComponentThemeOverride<ThemeType> = {
  theme: ThemeType;
  colorMode?: 'light' | 'dark';
  breakpoint?: keyof Breakpoints['values'];
  mediaQuery?: string;
  selector?: string;
};

export type BaseComponentTheme<
  ThemeType extends BaseTheme = BaseTheme,
  NameType extends string = string,
  TokensType extends WebTokens = WebTokens,
> = {
  name: NameType;
  theme: ComponentTheme<ThemeType, TokensType>;
  overrides?: Array<
    ComponentThemeOverride<ComponentTheme<ThemeType, TokensType>>
  >;
};
