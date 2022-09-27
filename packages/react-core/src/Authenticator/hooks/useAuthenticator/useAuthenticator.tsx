import React, { useCallback } from 'react';
import { useSelector } from '@xstate/react';
import { AuthMachineState, getServiceFacade } from '@aws-amplify/ui';

import { AuthenticatorContext } from '../../context';

import { USE_AUTHENTICATOR_ERROR } from './constants';
import { Selector, UseAuthenticator } from './types';
import { getComparator } from './utils';

const defaultComparator = () => false;

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#useauthenticator-hook)
 */
export default function useAuthenticator(
  selector?: Selector
): UseAuthenticator {
  const context = React.useContext(AuthenticatorContext);

  if (!context) {
    throw new Error(USE_AUTHENTICATOR_ERROR);
  }

  const { service } = context;
  const { send } = service;

  const xstateSelector = useCallback(
    (state: AuthMachineState) => ({ ...getServiceFacade({ send, state }) }),
    [send]
  );

  const comparator = selector ? getComparator(selector) : defaultComparator;

  const facade = useSelector(service, xstateSelector, comparator);

  return {
    ...facade,
    /** @deprecated For internal use only */
    // _state: service.getSnapshot(),
    /** @deprecated For internal use only */
    _send: send,
  };
}
