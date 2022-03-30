import { useSelector } from '@xstate/react';
import { LivenessMachineState } from '@aws-amplify/ui';

import { useLivenessFlow } from '../providers';

export type LivenessSelectorFn<T> = (state: LivenessMachineState) => T;

export function createLivenessSelector<T>(
  selector: LivenessSelectorFn<T>
): LivenessSelectorFn<T> {
  return selector;
}

export function useLivenessSelector<T>(selector: LivenessSelectorFn<T>) {
  const { service } = useLivenessFlow();
  return useSelector(service, selector);
}
