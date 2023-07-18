import { isUndefined } from '@aws-amplify/ui';

import usePreviousValue from './usePreviousValue';

/**
 * @param value `value` to track for updates
 * @param ignoreFirstRender whether to ignore initial render. defaults to `false`
 * @returns a boolean representing whether the tracked `value` has updated between renders
 *
 * Returns `false`:
 * - on initial render when ignoring first render
 * - current and previous `value` are equal
 *
 * Returns `true`:
 * - on initial render when not ignoring first render (default behavior)
 * - current and previous `value` are not equal
 */
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
