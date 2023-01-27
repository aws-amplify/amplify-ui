import { isUndefined } from '@aws-amplify/ui';

import usePreviousValue from './usePreviousValue';

export default function useHasValueUpdated<Value>(
  value: Value,
  ignoreFirstRender = false
): boolean {
  const previous = usePreviousValue<Value>(value);
  const shouldIgnoreChange = isUndefined(previous) && ignoreFirstRender;
  if (shouldIgnoreChange) {
    return false;
  }
  return previous !== value;
}
