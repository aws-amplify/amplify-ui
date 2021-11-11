import { useActor } from '@xstate/react';

import { useLivenessFlow } from '../providers';

export function useLivenessActor() {
  const { service } = useLivenessFlow();
  const actor = useActor(service);

  return actor;
}
