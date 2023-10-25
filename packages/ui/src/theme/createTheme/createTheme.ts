// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend.js';
import flattenProperties from 'style-dictionary/lib/utils/flattenProperties.js';

import { defaultTheme } from '../defaultTheme';
import { Theme, DefaultTheme, WebTheme, Override } from '../types';
import { setupToken, setupTokens } from './setupToken';
import { WebDesignToken } from '../tokens/types/designToken';
import { setupComponentTheme } from './setupComponentTheme';
import { isString } from '../../utils';

/**
 * This will be used like `const myTheme = createTheme({})`
 * `myTheme` can then be passed to a Provider or the generated CSS
 * can be passed to a stylesheet at build-time or run-time.
 * const myTheme = createTheme({})
 * const myOtherTheme = createTheme({}, myTheme);
 */
export function createTheme(
  theme?: Theme | WebTheme,
  DefaultTheme: DefaultTheme | WebTheme = defaultTheme
): WebTheme {
  // merge theme and DefaultTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects. We could change
  // this to another 3p deep merge solution too.
  const mergedTheme = deepExtend<DefaultTheme>([
    {},
    DefaultTheme,
    {
      ...theme,
      components: {},
    },
  ]);

  // if primaryColor is present on the theme, use it
  if (isString(theme?.primaryColor)) {
    mergedTheme.tokens.colors.brand.primary = Object.keys(
      mergedTheme.tokens.colors.brand.primary
    ).reduce((acc, key) => {
      return {
        ...acc,
        [key]: { value: `{colors.${theme.primaryColor}.${key}}` },
      };
    }, {} as typeof mergedTheme.tokens.colors.brand.primary);
  }

  // Setting up the tokens. This is similar to what Style Dictionary
  // does. At the end of this, each token should have:
  // - CSS variable name of itself
  // - its value (reference to another CSS variable or raw value)
  const tokens = setupTokens({
    tokens: mergedTheme.tokens,
    setupToken,
  }) as WebTheme['tokens']; // Setting the type here because setupTokens is recursive

  const { breakpoints, name } = mergedTheme;

  // flattenProperties is another internal Style Dictionary function
  // that creates an array of all tokens.
  let cssText =
    `[data-amplify-theme="${name}"] {\n` +
    flattenProperties(tokens)
      .map((token: WebDesignToken) => `${token.name}: ${token.value};`)
      .join('\n') +
    `\n}\n`;

  if (theme?.components) {
    cssText += setupComponentTheme(
      `[data-amplify-theme="${name}"]`,
      theme.components,
      tokens
    );
  }

  let overrides: Array<Override> = [];

  /**
   * For each override, we setup the tokens and then generate the CSS.
   * This allows us to have one single CSS string for all possible overrides
   * and avoid re-renders in React, but also support other frameworks as well.
   */
  if (mergedTheme.overrides) {
    overrides = mergedTheme.overrides.map((override) => {
      const overrideTokens = setupTokens({
        tokens: override.tokens,
        setupToken,
      });
      const customProperties = flattenProperties(overrideTokens)
        .map((token: WebDesignToken) => `${token.name}: ${token.value};`)
        .join('\n');
      // Overrides can have a selector, media query, breakpoint, or color mode
      // for creating the selector
      if ('selector' in override) {
        cssText += `\n${override.selector} {\n${customProperties}\n}\n`;
      }
      if ('mediaQuery' in override) {
        cssText += `\n@media (${override.mediaQuery}) {
  [data-amplify-theme="${name}"] {
    ${customProperties}
  }
}\n`;
      }
      if ('breakpoint' in override) {
        const breakpoint = mergedTheme.breakpoints.values[override.breakpoint];
        cssText += `\n@media (min-width: ${breakpoint}px) {
  [data-amplify-theme="${name}"] {
    ${customProperties}
  }
}\n`;
      }
      if ('colorMode' in override) {
        cssText += `\n@media (prefers-color-scheme: ${override.colorMode}) {
          [data-amplify-theme="${name}"][data-amplify-color-mode="system"] {
            ${customProperties}
            color-scheme: ${override.colorMode};
          }
        }\n`;
        cssText += `\n[data-amplify-theme="${name}"][data-amplify-color-mode="${override.colorMode}"] {
          ${customProperties}
          color-scheme: ${override.colorMode};
        }\n`;
        if (override.components) {
          cssText += setupComponentTheme(
            `[data-amplify-theme="${name}"][data-amplify-color-mode="${override.colorMode}"]`,
            override.components,
            tokens
          );
        }
      }

      return {
        ...override,
        tokens: overrideTokens,
      };
    });
  }

  return {
    tokens,
    breakpoints,
    name,
    cssText,
    // keep overrides separate from base theme
    // this allows web platforms to use plain CSS scoped to a
    // selector and only override the CSS vars needed. This
    // means we could generate CSS at build-time in a postcss
    // plugin, or do it at runtime and inject the CSS into a
    // style tag.
    // This also allows RN to dynamically switch themes in a
    // provider.
    overrides,
  };
}
