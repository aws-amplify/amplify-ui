import { isFunction } from '@aws-amplify/ui';
export const AMPLIFY_SYMBOL = (
  typeof Symbol !== 'undefined' && isFunction(Symbol.for)
    ? Symbol.for('amplify_default')
    : '@@amplify_default'
) as Symbol;
