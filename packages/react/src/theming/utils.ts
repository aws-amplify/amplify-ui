import merge from "deepmerge";
import { Theme, ThemeOptions } from "./types";
import { BaseTheme } from "@aws-amplify/ui-theme-base";

const isThemeObject = (theme: unknown): theme is Theme =>
  typeof theme === "object";

/**
 * Traverse a theme, token by token
 * @param obj Theme object
 * @param predicate A function executed for every token
 * @param path Current token path (e.g ["colors", "teal", "500"])
 */
const themeWalk = (
  theme: Theme,
  predicate: (key: string, value: string, path: string[]) => void,
  path: string[] = []
) => {
  for (const key in theme) {
    const currentPath = [...path, key];
    const value = theme[key];

    if (isThemeObject(value)) {
      themeWalk(value, predicate, currentPath);
    } else {
      predicate(key, value, currentPath);
    }
  }
};

/**
 * Generates a CSS variables map (from a theme)
 *
 * @param theme Theme object
 * @param cssPrefix Prefix for CSS Variables (e.g amplify-ui)
 */
export const getCSSVariables = (theme: Theme, options?: ThemeOptions) => {
  const variables = new Map<string, string>();

  // Appends a CSS variable for every theme token (key -> value)
  themeWalk(theme, (key, value, path) => {
    const name = [options.cssPrefix, ...path].join("-");
    variables.set(`--${name}`, value);
  });

  return variables;
};

/**
 * Extends a theme, applying overrides to create a new theme instance.
 * Note: Original theme object is not changed during merging
 *
 * @param overrides Dictionary of theme tokens to override
 */
export const extendTheme = (theme: Theme, overrides: Partial<Theme>): Theme =>
  merge(theme, overrides);

/**
 * Creates a new theme (extended from BaseTheme)
 *
 * @param overrides Dictionary of theme tokens to override
 *
 * Usage:
 * ```jsx
 * const MyCustomTheme = createTheme({
 *   colors: {
 *     primary: 'purple'
 *   },
 *   text: {
 *     font: {
 *        family: 'monospace'
 *     }
 *   }
 * });
 *
 * const ThemedApp = withTheme(App, MyCustomTheme);
 * ```
 */
export const createTheme = (overrides: Partial<Theme>): Theme =>
  extendTheme(BaseTheme, overrides);
