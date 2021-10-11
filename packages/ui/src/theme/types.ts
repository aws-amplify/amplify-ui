import { PartialDeep } from 'type-fest';
import { Tokens } from './tokens';
import { Breakpoints } from './breakpoints';

export interface Override {
  // media query?
  tokens?: PartialDeep<Tokens>;
}

// There are 3 types of Themes:
// BaseTheme: should have *all* theme tokens defined
// PartialTheme: can have *any* part of a theme defined
// Theme: the 'created' theme which

export interface BaseTheme {
  tokens: Tokens;
  breakpoints?: Breakpoints;
  overrides?: Array<Override>;
}

export type PartialTheme = PartialDeep<BaseTheme>;

export interface Theme {
  tokens: Tokens;
  css: string;
  breakpoints?: Breakpoints;
  overrides?: Array<Override>;
}
