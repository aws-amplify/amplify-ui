import kebabCase from 'lodash/kebabCase';

// internal style dictionary functions
import usesReference from 'style-dictionary/lib/utils/references/usesReference';
import { DesignToken } from '.';

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
  if (typeof value === 'string' && usesReference(value)) {
    return referenceValue(value);
  }
  if (typeof value === 'object') {
    if ('offsetX' in value) {
      const { offsetX = '', offsetY = '', blurRadius = '', color = '' } = value;
      return `${referenceValue(offsetX)} ${referenceValue(
        offsetY
      )} ${referenceValue(blurRadius)} ${referenceValue(color)}`;
    }
  }

  return value;
}

export function cssNameTransform({ path = [] }: { path: Array<string> }) {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
}
