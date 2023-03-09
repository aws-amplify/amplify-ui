import { useSelector } from '@xstate/react';
import { LivenessMachineState } from '@aws-amplify/ui';

import { useFaceLivenessDetector } from '../providers';

export type LivenessSelectorFn<T> = (state: LivenessMachineState) => T;

export function createLivenessSelector<T>(
  selector: LivenessSelectorFn<T>
): LivenessSelectorFn<T> {
  return selector;
}

export function useLivenessSelector<T>(selector: LivenessSelectorFn<T>): T {
  const { service } = useFaceLivenessDetector();
  return useSelector(service, selector);
}
