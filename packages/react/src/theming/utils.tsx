import { paramCase } from 'param-case';

import { CSSPrefix } from './types';

/**
 * Traverse a theme, token by token
 * @param theme Theme object
 * @param predicate A function executed for every token
 * @param path Current token path (e.g ["colors", "teal", "500"])
 */
const themeWalk = (
  theme: {},
  predicate: (value: string, path: string[]) => void,
  path: string[] = []
) => {
  for (const key in theme) {
    const currentPath = [...path, key];
    const value = theme[key];

    if (typeof value === 'object') {
      themeWalk(value, predicate, currentPath);
    } else {
      predicate(value, currentPath);
    }
  }
};

/**
 * Generates a CSS variables map (from a theme)
 * @param theme Theme object
 */
export const getCSSVariablesFromTheme = (theme: {}) => {
  const CSSVariables = {};
  // Appends a CSS variable for every theme token (key -> value)
  themeWalk(theme, (value, path) => {
    path = path.map((key) => paramCase(key));
    const name = [CSSPrefix, ...path].join('-');
    CSSVariables[`--${name}`] = value;
  });

  return CSSVariables;
};
