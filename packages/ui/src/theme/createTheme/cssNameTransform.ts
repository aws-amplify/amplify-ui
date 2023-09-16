import kebabCase from 'lodash/kebabCase.js';

export const CSS_VARIABLE_PREFIX = 'amplify';

interface NameTransformProps {
  path?: Array<string>;
}

export function cssNameTransform({ path = [] }: NameTransformProps): string {
  return `${kebabCase([CSS_VARIABLE_PREFIX, ...path].join(' '))}`;
}
