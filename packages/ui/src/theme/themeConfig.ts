import { PartialDeep } from 'type-fest';
import { AmplifyTheme } from './tokens';

export interface ThemeOverride {
  /**
   * Could be a class name, media query, or :root
   * Should be a class name
   * Would this have any effect on non-web platforms?
   */
  // name?: string;
  tokens?: PartialDeep<AmplifyTheme>;
}

export interface ThemeConfig {
  overrides?: Record<string, ThemeOverride>;
  name?: string;
  tokens?: PartialDeep<AmplifyTheme>;
  breakpoints?: any;
}
