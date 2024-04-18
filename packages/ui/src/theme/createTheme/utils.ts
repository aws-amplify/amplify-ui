// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference.js';
import kebabCase from 'lodash/kebabCase.js';
import { has, isObject, isString } from '../../utils';
import { WebDesignToken } from '../types';
import { ShadowValue } from '../tokens/types/designToken';

export const CSS_VARIABLE_PREFIX = 'amplify';

interface NameTransformProps {
  path?: Array<string>;
}

export function cssNameTransform({ path = [] }: NameTransformProps): string {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
}

type BaseDesignToken = {
  value: string | number;
};

type ShadowPropertyKey = keyof Exclude<ShadowValue, string>;

// Important: these properties should not be altered in
// order to maintain the expected order of the CSS `box-shadow` property
const SHADOW_PROPERTIES: ShadowPropertyKey[] = [
  'offsetX',
  'offsetY',
  'blurRadius',
  'spreadRadius',
  'color',
];

/**
 * Will take a design token in a theme and return its value as CSS
 *
 * @param token
 * @returns
 */
export function cssValue(token: BaseDesignToken): string | number {
  const { value } = token;
  if (isString(value)) {
    return referenceValue(value);
  }

  if (isShadowTokenObject(value)) {
    return SHADOW_PROPERTIES.map((property) => {
      return referenceValue(
        // lookup property against `token` first for custom non-nested value, then lookup
        // property against `value` for design token value
        isShadowTokenObject(token) ? token[property] : value[property]
      );
    }).join(' ');
  }

  return value;
}

/**
 * Helper function to test if something is a design token or not.
 * Used in the React component style props.
 *
 * @param value - thing to test if it is a design token or not
 * @returns boolean
 */
export function isDesignToken(value: unknown): value is WebDesignToken {
  return isObject(value) && has(value, 'value');
}

export function isShadowTokenObject(
  value: unknown
): value is ShadowValue & object {
  return isObject(value) && has(value, 'offsetX');
}

/**
 * Function that sees if a string contains a design token reference
 * and if so will turn that into a CSS variable.
 *
 * @param {string} value
 * @returns string
 */
export function referenceValue(value?: string) {
  if (!value) return '';
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export type SetupToken<ReturnType = any> = (args: {
  token: BaseDesignToken;
  path: Array<string>;
}) => ReturnType;

/**
 * This will take a design token and add some data to it for it
 * to be used in JS/CSS. It will create its CSS var name and update
 * the value to use a CSS var if it is a reference. It will also
 * add a `.toString()` method to make it easier to use in JS.
 *
 * We should see if there is a way to share this logic with style dictionary...
 */
export const setupToken: SetupToken<WebDesignToken> = ({ token, path }) => {
  const name = `--${cssNameTransform({ path })}`;
  const { value: original } = token;
  const value = cssValue(token);

  return { name, original, path, value, toString: () => `var(${name})` };
};

type SetupTokensProps = {
  tokens?: Record<string | number, any>;
  path?: Array<string>;
  setupToken: SetupToken;
};

/**
 * Recursive function that will walk down the token object
 * and perform the setupToken function on each token.
 * Similar to what Style Dictionary does.
 */
export function setupTokens({
  tokens,
  path = [],
  setupToken,
}: SetupTokensProps): any {
  if (has(tokens, 'value')) {
    return setupToken({ token: tokens as BaseDesignToken, path });
  }

  const output: Record<string, any> = {};

  for (const name in tokens) {
    if (has(tokens, name)) {
      const value = tokens[name];
      const nextTokens = isObject(value) ? value : { value };

      output[name] = setupTokens({
        tokens: nextTokens,
        path: path.concat(name),
        setupToken,
      });
    }
  }

  return output;
}
