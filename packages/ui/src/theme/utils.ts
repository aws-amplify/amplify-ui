import kebabCase from 'lodash/kebabCase';

// internal style dictionary functions
import usesReference from 'style-dictionary/lib/utils/references/usesReference';

export const CSS_VARIABLE_PREFIX = 'amplify';

export function cssValue(value: string) {
  // TODO: handle non-strings and make more robust
  // this basically does the `outputReferences` part of SD
  if (typeof value === 'string' && usesReference(value)) {
    const path = value.replace(/\{|\}/g, '').replace('.value', '').split('.');
    return `var(--${cssNameTransform({ path })})`;
  }
  return value;
}

export function cssNameTransform({ path = [] }: { path: Array<string> }) {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
}
