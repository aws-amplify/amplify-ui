// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend.js';
import flattenProperties from 'style-dictionary/lib/utils/flattenProperties.js';

import { defaultTheme } from './defaultTheme';
import { Theme, DefaultTheme, WebTheme, Override } from './types';
import { cssValue, cssNameTransform, setupTokens, SetupToken } from './utils';
import { WebDesignToken } from './tokens/types/designToken';
import { isString } from '../utils';
import { ColorValues, ScaleKey } from './tokens/colors';

/**
 * This will take a design token and add some data to it for it
 * to be used in JS/CSS. It will create its CSS var name and update
 * the value to use a CSS var if it is a reference. It will also
 * add a `.toString()` method to make it easier to use in JS.
 *
 * We should see if there is a way to share this logic with style dictionary...
 */
const setupToken: SetupToken<WebDesignToken> = ({ token, path }) => {
  const name = `--${cssNameTransform({ path })}`;
  const { value: original } = token;
  const value = cssValue(token);

  return { name, original, path, value, toString: () => `var(${name})` };
};

/**
 * Takes a set of keys and a color name and returns an object of design tokens,
 * used for applying a primary color at the theme level to our tokens.
 *
 * createColorPalette({keys: ['10','20',...], value: 'red'})
 * returns {
 *   10: { value: '{colors.red.10.value}' },
 *   20: { value: '{colors.red.20.value}' },
 *   ...
 * }
 */
function createColorPalette<
  ColorType extends ColorValues<ScaleKey, 'default'> = ColorValues<
    ScaleKey,
    'default'
  >,
>({ keys, value }: { keys: string[]; value: string }): ColorType {
  return keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: { value: `{colors.${value}.${key}.value}` },
    };
  }, {} as ColorType);
}

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
  const mergedTheme = deepExtend<DefaultTheme>([{}, DefaultTheme, theme]);
  const { primaryColor, secondaryColor } = mergedTheme;

  // apply primaryColor and secondaryColor if present
  if (isString(primaryColor)) {
    mergedTheme.tokens.colors.primary = createColorPalette({
      keys: Object.keys(mergedTheme.tokens.colors[primaryColor]),
      value: primaryColor,
    });
  }
  if (isString(secondaryColor)) {
    mergedTheme.tokens.colors.secondary = createColorPalette({
      keys: Object.keys(mergedTheme.tokens.colors[secondaryColor]),
      value: secondaryColor,
    });
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

  let overrides: Array<Override> = [];

  /**
   * For each override, we setup the tokens and then generate the CSS.
   * This allows us to have one single CSS string for all possible overrides
   * and avoid re-renders in React, but also support other frameworks as well.
   */
  if (mergedTheme.overrides) {
    overrides = mergedTheme.overrides.map((override) => {
      const tokens = setupTokens({
        tokens: override.tokens,
        setupToken,
      });
      const customProperties = flattenProperties(tokens)
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
      }

      return {
        ...override,
        tokens,
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
