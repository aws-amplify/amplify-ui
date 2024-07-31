import { isFunction } from '@aws-amplify/ui';
export const AMPLIFY_SYMBOL = (
  typeof Symbol !== 'undefined' && isFunction(Symbol.for)
    ? Symbol.for('amplify_default')
    : '@@amplify_default'
) as Symbol;

export const ERROR_SUFFIX = 'error';
export const DESCRIPTION_SUFFIX = 'description';
