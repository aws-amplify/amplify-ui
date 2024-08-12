import type * as CSS from 'csstype';
import { DesignToken } from '../types';
import { WebTokens } from '../tokens';
import { Breakpoints } from '../breakpoints';

export type ColorTheme = 'info' | 'warning' | 'success' | 'error';

export type Size = 'small' | 'large';

export type Orientation = 'horizontal' | 'vertical';

export type FieldControlModifiers = Size | 'error' | 'quiet';

// Allows for properties to either be a design token
// or a the property type. This gives users autocomplete for properties with
// enums like `position: 'absolute'`
export type CSSProperties = {
  [Key in keyof CSS.Properties]:
    | DesignToken<CSS.Properties[Key] | (string & {})>
    | CSS.Properties[Key];
};

// Allows for psuedo selectors and attribute selectors
// in a component theme, like:
// { ':hover': { backgroundColor: 'red' }}
export type Selectors = {
  [key in CSS.HtmlAttributes | CSS.Pseudos]?: CSSProperties;
};

export interface ComponentStyles extends CSSProperties, Selectors {
  _vars?: Record<string, DesignToken | string>;
}

export type Modifiers<
  Keys extends string = string,
  Required extends boolean = false,
> = Required extends true
  ? {
      _modifiers: { [key in Keys]: ComponentStyles };
    }
  : {
      _modifiers?: { [key in Keys]?: ComponentStyles };
    };

export type Elements<
  Properties extends Record<
    string,
    ComponentStyles & {
      _modifiers?: Record<string, ComponentStyles>;
    }
  >,
  Required extends boolean = false,
> = Required extends true
  ? {
      _element: Properties;
    }
  : {
      _element?: Properties;
    };

export interface BaseTheme extends ComponentStyles {
  _modifiers?: Record<string, ComponentStyles>;
  _element?: Record<
    string,
    ComponentStyles & {
      _modifiers?: Record<string, ComponentStyles>;
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
