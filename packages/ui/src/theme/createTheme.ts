// Internal Style Dictionary methods
import deepExtend from 'style-dictionary/lib/utils/deepExtend.js';
import flattenProperties from 'style-dictionary/lib/utils/flattenProperties.js';

import { defaultTheme } from './defaultTheme';
import { Theme, DefaultTheme, WebTheme, Override } from './types';
import {
  cssValue,
  cssNameTransform,
  setupTokens,
  SetupToken,
  isDesignToken,
} from './utils';
import { WebDesignToken } from './tokens/types/designToken';
import { ComponentsTheme } from './components';
import { kebabCase, split } from 'lodash';
import { isFunction, isString, splitObject } from '../utils';

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
 * This will take an object like:
 * {paddingTop:'20px',color:'{colors.font.primary}'}
 * and turn it into a CSS string:
 * `padding-top:20px; color: var(--colors-font-primary);`
 */
function propsToString(props: Record<string, string>): string {
  return Object.entries(props)
    .map(([key, value]) => {
      // const _value = isString(value) ? value : value.value;
      // @ts-ignore
      const _value = isDesignToken(value)
        ? cssValue(value)
        : cssValue({ value });
      return `${kebabCase(key)}:${_value}; `;
    })
    .join(' ');
}

const stateKeys = ['_hover', '_active'];
const modifierKeys = ['variation', 'size', 'colorTheme'];

const nonPropKeys = [...stateKeys, ...modifierKeys];

export function createComponentCSS(
  str: string,
  components: ComponentsTheme,
  tokens: DefaultTheme['tokens']
): string {
  let cssText = '';
  // first we need to create the classname based on the key `.amplify-${key}`
  // we need to turn references into CSS vars
  // we need to turn prop names from camelCase into kebab-case (fontSize => font-size)
  // for modifiers (variant, size) we need to separate those out into separate classes
  // and create the classnames for those
  // for children do the same
  // and we need to handle states like :hover, :active

  Object.entries(components).forEach(([key, component]) => {
    const componentClassName = `${str} .amplify-${key}`;
    const componentTheme = isFunction(component)
      ? (component(tokens) as typeof component)
      : component;

    // TODO: this logic needs to be hardened
    // const [props, other] = splitObject(_componentTheme, (key, value) => {
    //   return isString(value);
    // });

    const [states, nonStates] = splitObject(componentTheme, (key, value) => {
      return stateKeys.includes(key);
    });

    const [modifiers, other] = splitObject(nonStates, (key, value) => {
      return modifierKeys.includes(key);
    });

    const [children, props] = splitObject(other, (key, value) => {
      return key === 'children';
    });

    // if there are no props, skip
    cssText += `${componentClassName} {`;
    cssText += propsToString(props);
    cssText += `}\n`;

    Object.entries(states).forEach(([key, value]) => {
      cssText += `${componentClassName}:${key.replace('_', '')} {`;
      cssText += propsToString(value);
      cssText += `}\n`;
    });

    Object.entries(modifiers).forEach(([modifier, value]) => {
      Object.keys(value).forEach((key) => {
        const {} = value[key];
        const [states, props] = Object.keys(value[key]).reduce(
          (acc, curr) => {
            if (stateKeys.includes(curr)) {
              acc[0][curr] = value[key][curr];
            } else {
              acc[1][curr] = value[key][curr];
            }
            return acc;
          },
          [{}, {}]
        );
        cssText += `${componentClassName}--${key} { `;
        cssText += propsToString(props);
        cssText += ` }`;
        if (Object.keys(states).length) {
          Object.keys(states).forEach((state) => {
            cssText += `${componentClassName}--${key}:${state.replace(
              '_',
              ''
            )} { `;
            cssText += propsToString(states[state]);
            cssText += ` }`;
          });
        }
      });
    });

    Object.entries(children).forEach(([key, value]) => {
      cssText += `${componentClassName}__${key} { `;
      cssText += propsToString(value);
      cssText += ` }`;
    });
  });

  return cssText;
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
  const mergedTheme = deepExtend<DefaultTheme>([
    {},
    DefaultTheme,
    {
      ...theme,
      components: {},
    },
  ]);

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
    cssText += createComponentCSS(
      `[data-amplify-theme="${name}"]`,
      theme.components,
      mergedTheme.tokens
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
          [data-amplify-theme="${name}"][data-amplify-color-mode="system"] {\n${customProperties}\n}
        }\n`;
        cssText += `\n[data-amplify-theme="${name}"][data-amplify-color-mode="${override.colorMode}"] {\n${customProperties}\n}\n`;
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
