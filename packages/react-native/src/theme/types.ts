import { Tokens } from './tokens';

type Override = Omit<Theme, 'overrides'>;

export type ColorMode = 'light' | 'dark' | 'system';

/**
 * A Theme just needs a name.
 * Users can define any tokens they need, but they don't need a complete theme with all tokens.
 */
export interface BaseTheme {
  colorMode?: ColorMode;
  /**
   * The name of the theme.
   */
  name: string;
  tokens?: Tokens;
  /**
   * Overrides allow you to change design tokens in different contexts, like
   * light and dark mode.
   */
  overrides?: Override[];
}

export interface ComponentStyles {
  // TODO: add components
}

/**
 * Fully built theme that has styling based
 * on the design tokens and all design tokens have added fields
 * to be used in Javascript/Typescript.
 */
export interface Theme extends BaseTheme {
  tokens: Tokens;
}
