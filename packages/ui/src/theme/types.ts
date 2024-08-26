import { PartialDeep } from '../types';
import { DefaultTokens, Tokens, WebTokens } from './tokens';
import { Breakpoints } from './breakpoints';
import { ComponentsTheme } from './components';
import { CSSProperties } from './components/utils';

export * from './tokens/types/designToken';
export type { BorderWidths } from './tokens/borderWidths';
export type { FontSizes } from './tokens/fontSizes';
export type { FontWeights } from './tokens/fontWeights';
export type { LineHeights } from './tokens/lineHeights';
export type { Radii } from './tokens/radii';
export type { Shadows } from './tokens/shadows';
export type { SpaceSizes } from './tokens/space';

export { Tokens };

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
  breakpoint: keyof Breakpoints['values'];
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

/**
 * A Theme just needs a name. This is what a user would generally deal with.
 * They can define any tokens or breakpoints they need, but they don't need a
 * complete theme with all tokens.
 */
export interface Theme<TokensType extends WebTokens = WebTokens> {
  /**
   * The name of the theme. This is used to create scoped CSS to allow for
   * multiple themes on a page.
   */
  name: string;
  tokens?: Tokens;
  primaryColor?: string;
  secondaryColor?: string;
  breakpoints?: PartialDeep<Breakpoints>;
  /**
   * Overrides allow you to change design tokens in different contexts, like
   * light and dark mode. You can also have other media query overrides as well
   * as breakpoint overrides which correspond to the Breakpoints on a theme,
   * and a generic selector override.
   */
  overrides?: Array<Override>;

  components?: Array<ComponentsTheme<TokensType>>;

  animations?: Animations;
}

export interface Animations {
  [key: string]: {
    [key in 'to' | 'from' | `${string}%`]?:
      | CSSProperties
      | ((tokens: WebTokens) => CSSProperties);
  };
}

/**
 * A DefaultTheme has all tokens and breakpoints required
 */
export interface DefaultTheme
  extends Pick<
    Theme,
    | 'name'
    | 'overrides'
    | 'primaryColor'
    | 'secondaryColor'
    | 'components'
    | 'animations'
  > {
  tokens: DefaultTokens;
  breakpoints: Breakpoints;
}

interface ContainerPropsArgs {
  colorMode?: ColorMode | 'system';
}

/**
 * WebTheme is a fully built theme that has cssText based
 * on the design tokens and all design tokens have added fields
 * to be used in Javascript/Typescript.
 */
export interface WebTheme
  extends Pick<
    DefaultTheme,
    'breakpoints' | 'name' | 'overrides' | 'components' | 'animations'
  > {
  primaryColor?: string;
  secondaryColor?: string;
  cssText: string;
  containerProps: (containerProps?: ContainerPropsArgs) => {
    'data-amplify-theme'?: string;
    'data-amplify-color-mode'?: string;
  };
  // property `components` is not specified on `WebTokens`,
  // but is a required token property of `WebTheme`
  tokens: WebTokens;
}
