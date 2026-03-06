import { createContextUtilities } from '@aws-amplify/ui-react-core';

import type { ActionHandlersContext } from './types';

export const { ActionHandlersProvider, useActionHandlers } =
  createContextUtilities<ActionHandlersContext, 'ActionHandlers'>({
    contextName: 'ActionHandlers',
    errorMessage:
      '`useActionHandlers` must be called from within an `ActionHandlersProvider',
  });
