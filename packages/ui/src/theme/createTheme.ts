// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend';
import flattenProperties from 'style-dictionary/lib/utils/flattenProperties';

import { baseTheme as _baseTheme } from './baseTheme';
import { Theme, BaseTheme, PartialTheme } from './types';
import { cssValue, cssNameTransform } from './utils';
import { Tokens } from './tokens';

/**
 * This will take a design token and add some data to it for it
 * to be used in JS/CSS. It will create its CSS var name and update
 * the value to use a CSS var if it is a reference. It will also
 * add a `.toString()` method to make it easier to use in JS.
 *
 * We should see if there is a way to share this logic with style dictionary...
 */
function setupToken(token: { value: any }, path: Array<string>) {
  const name = `--${cssNameTransform({ path })}`;
  const { value } = token;
  return {
    name,
    path,
    value: cssValue(value),
    original: value,
    toString: () => `var(${name})`,
  };
}

/**
 * Recursive function that will walk down the token object
 * and perform the setupToken function on each token.
 * Similar to what Style Dictionary does.
 */
function setupTokens(obj: any, path = []) {
  let tokens = {};

  if (obj.hasOwnProperty('value')) {
    return setupToken(obj, path);
  } else {
    for (const name in obj) {
      if (obj.hasOwnProperty(name)) {
        tokens[name] = setupTokens(obj[name], path.concat(name));
      }
    }
  }

  return tokens;
}

/**
 * This will be used like `const myTheme = createTheme({})`
 * `myTheme` can then be passed to a Provider or the generated CSS
 * can be passed to a stylesheet at build-time or run-time.
 */
export function createTheme(
  theme?: PartialTheme,
  baseTheme: BaseTheme | Theme = _baseTheme
): Theme {
  // merge theme and baseTheme to get a complete theme
  // deepExtend is an internal Style Dictionary method
  // that performs a deep merge on n objects. We could change
  // this to another 3p deep merge solution too.
  const mergedTheme: Theme = deepExtend([{}, baseTheme, theme]);

  // Setting up the tokens. This is similar to what Style Dictionary
  // does. At the end of this, each token should have:
  // - CSS variable name of itself
  // - its value (reference to another CSS variable or raw value)
  const tokens: Tokens = setupTokens(mergedTheme.tokens) as Tokens; // Setting the type here because setupTokens is recursive

  const { breakpoints } = mergedTheme;

  // flattenProperties is another internal Style Dictionary function
  // it creates an array of all tokens
  const css =
    `[data-amplify-theme] {\n` +
    flattenProperties(tokens)
      .map((token) => {
        return `${token.name}: ${token.value};`;
      })
      .join('\n') +
    `}`;

  const { overrides } = mergedTheme;

  // TODO: handle 'overrides'

  return {
    tokens,
    breakpoints,
    css,
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
