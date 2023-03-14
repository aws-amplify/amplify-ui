import { useSelector } from '@xstate/react';

import { useFaceLivenessDetector } from '../providers';
import { LivenessMachineState } from '../service';

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
