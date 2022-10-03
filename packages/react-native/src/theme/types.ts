import { ButtonStyles } from '../primitives/Button';
import { Tokens } from './tokens';

type Override = Omit<Theme, 'overrides'>;

export type ColorMode = 'light' | 'dark' | 'system';

export interface Theme {
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
  overrides?: Array<Override>;
}

export interface ComponentStyles {
  button: ButtonStyles;
  // TODO: add other components
}
