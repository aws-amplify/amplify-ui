import { PartialDeep } from 'type-fest';
import { Tokens } from './tokens';
import { Breakpoints } from './breakpoints';

export { DesignToken } from './tokens/types/designToken';

/**
 * An override is a set of tokens that override others
 * in certain contexts. On Android, these are like resource
 * qualifiers. On the web, these are like media queries with
 * a set of CSS variables in it. A theme should contain
 * everything it needs to render
 */
export type Override =
  | SelectorOverride
  | MediaQueryOverride
  | BreakpointOverride
  | ColorModeOverride;

interface BaseOverride {
  tokens?: PartialDeep<Tokens>;
}

/**
 * This override takes a breakpoint name and creates a media-query for that
 * breakpoint
 * ```css
 * @media (min-width: 20em) {
 *    [data-amplify-theme] {
 *      --amplify-font-size-large: 2rem;
 *    }
 * }
 * ```
 */
interface BreakpointOverride extends BaseOverride {
  breakpoint?: keyof Breakpoints['values'];
}

/**
 * ```css
 * @media (prefers-color-scheme: dark) {
 *    --amplify-colors-background-primary: black;
 *    --amplify-colors-font-primary: white;
 * }
 * ```
 */
export interface MediaQueryOverride extends BaseOverride {
  mediaQuery: string;
}

/**
 * ```css
 * .disco-theme {
 *    --amplify-colors-background-primary: pink;
 * }
 * [data-my-cool-theme] {
 *    --amplify-colors-font-primary: purple;
 * }
 * ```
 */
export interface SelectorOverride extends BaseOverride {
  selector: string;
}

type ColorMode = 'light' | 'dark';

/**
 * This creates a color mode override, where the color mode is 'light' or 'dark'.
 * Note: there is no 'system' here.
 *
 * ```css
 * @media(prefers-color-scheme: dark) {
 *    [data-amplify-color-mode="system"] {
 *    }
 * }
 *
 * [data-amplify-color-mode="dark"] {
 *
 * }
 * ```
 */
export interface ColorModeOverride extends BaseOverride {
  colorMode: ColorMode;
}

// There are 3 types of Themes:
// BaseTheme: should have *all* theme tokens defined
// PartialTheme: can have *any* part of a theme defined, this is what users interact with
// Theme: the 'created' theme which is returned from the `createTheme` method

export interface BaseTheme {
  tokens: Tokens;
  breakpoints?: Breakpoints;
  overrides?: Array<Override>;
}

export type PartialTheme = PartialDeep<BaseTheme>;

export interface Theme extends BaseTheme {
  css: string;
}
