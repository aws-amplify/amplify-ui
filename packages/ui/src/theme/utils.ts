import kebabCase from 'lodash/kebabCase';
// internal style dictionary function
import usesReference from 'style-dictionary/lib/utils/references/usesReference';

import { DesignToken, WebDesignToken } from './tokens/types/designToken';

export const CSS_VARIABLE_PREFIX = 'amplify';

function referenceValue(value: string) {
  if (usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export function cssValue(token: DesignToken) {
  const { value } = token;
  if (typeof value === 'string') {
    return referenceValue(value);
  }
  if (typeof value === 'object') {
    if ('offsetX' in value) {
      const {
        offsetX = '',
        offsetY = '',
        blurRadius = '',
        spreadRadius = '',
        color = '',
      } = value;
      return [
        referenceValue(offsetX),
        referenceValue(offsetY),
        referenceValue(blurRadius),
        referenceValue(spreadRadius),
        referenceValue(color),
      ].join(' ');
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
