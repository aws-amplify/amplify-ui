import { useActor } from '@xstate/react';

import { useLivenessFlow } from '../providers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLivenessActor() {
  const { service } = useLivenessFlow();
  const actor = useActor(service);

  return actor;
}
