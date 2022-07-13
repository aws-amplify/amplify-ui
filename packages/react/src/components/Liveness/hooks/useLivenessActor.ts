import { useActor } from '@xstate/react';

import { useLivenessFlow } from '../providers';

// TODO: Add type annotations. Currently typing the actors returned from Xstate is difficult
// because the interpreter and state can not be used to form a type.

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLivenessActor() {
  const { service } = useLivenessFlow();
  const actor = useActor(service);

  return actor;
}
