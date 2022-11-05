import kebabCase from 'lodash/kebabCase';
// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference';

import {
  DesignToken,
  ShadowValue,
  WebDesignToken,
} from './tokens/types/designToken';

import has from 'lodash/has';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

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

function referenceValue(value: string) {
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export function cssValue(token: DesignToken) {
  const { value } = token;
  if (isString(value)) {
    return referenceValue(value);
  }
  if (isObject(value)) {
    if ('offsetX' in value) {
      return SHADOW_PROPERTIES.map((property) =>
        // lookup property against `token` first for custom value, then lookup
        // property against `value` for design token value, default to empty string
        referenceValue(token[property] ?? value[property] ?? '')
      ).join(' ');
    }
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
  if (isObject(value)) {
    return has(value, 'value');
  } else {
    return false;
  }
}
