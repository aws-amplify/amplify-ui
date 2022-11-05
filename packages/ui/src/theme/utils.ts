import kebabCase from 'lodash/kebabCase';
// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference';

import {
  DesignToken,
  ShadowValue,
  WebDesignToken,
} from './tokens/types/designToken';

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

const getShadowProperty = (
  token: DesignToken,
  value: DesignToken,
  property: ShadowPropertyKey
) => token[property] ?? value[property] ?? '';

export function cssValue(token: DesignToken) {
  const { value } = token;
  if (typeof value === 'string') {
    return referenceValue(value);
  }
  if (typeof value === 'object') {
    if ('offsetX' in value) {
      return SHADOW_PROPERTIES.map((property) =>
        getShadowProperty(token, value, property)
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
  if (typeof value === 'object') {
    return Object.prototype.hasOwnProperty.call(value, 'value');
  } else {
    return false;
  }
}
