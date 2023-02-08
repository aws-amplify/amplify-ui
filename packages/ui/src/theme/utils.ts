// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference.js';

import { isObject, isString, has, kebabCase } from '../utils';
import { ShadowValue, WebDesignToken } from './tokens/types/designToken';

type ShadowPropertyKey = keyof Exclude<ShadowValue, string>;

export const CSS_VARIABLE_PREFIX = 'amplify';

// Important: these properties should not be altered in
// order to maintain the expected order of the CSS `box-shadow` property
const SHADOW_PROPERTIES: ShadowPropertyKey[] = [
  'offsetX',
  'offsetY',
  'blurRadius',
  'spreadRadius',
  'color',
];

function referenceValue(value?: string) {
  if (!value) return '';
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export function cssValue(token: BaseDesignToken): string | number {
  const { value } = token;
  if (isString(value)) {
    return referenceValue(value);
  }

  if (isShadowToken(value)) {
    return SHADOW_PROPERTIES.map((property) => {
      return referenceValue(
        // lookup property against `token` first for custom non-nested value, then lookup
        // property against `value` for design token value
        isShadowToken(token) ? token[property] : value[property]
      );
    }).join(' ');
  }

  return value;
}

interface NameTransformProps {
  path?: Array<string>;
}

export function cssNameTransform({ path = [] }: NameTransformProps): string {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
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

export function isShadowToken(value: unknown): value is ShadowValue {
  return isObject(value) && has(value, 'offsetX');
}

type SetupTokensProps = {
  tokens?: Record<string | number, any>;
  path?: Array<string>;
  setupToken: SetupToken;
};

export type SetupToken<ReturnType = any> = (args: {
  token: BaseDesignToken;
  path: Array<string>;
}) => ReturnType;

type BaseDesignToken = {
  value: string | number;
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
