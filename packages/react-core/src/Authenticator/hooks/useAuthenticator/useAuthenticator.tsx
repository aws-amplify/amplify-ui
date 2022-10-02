import React, { useCallback } from 'react';
import { useSelector } from '@xstate/react';
import {
  AuthMachineState,
  getServiceFacade,
  getSortedFormFields,
} from '@aws-amplify/ui';

import { AuthenticatorContext } from '../../context';

import { USE_AUTHENTICATOR_ERROR } from './constants';
import { Selector, UseAuthenticator } from './types';
import {
  defaultComparator,
  getComparator,
  getTotpSecretCodeCallback,
  isComponentRouteKey,
} from './utils';

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

  const { route, user, ...rest } = facade;

  const serviceSnapshot = service.getSnapshot();

  const fields = isComponentRouteKey(route)
    ? getSortedFormFields(route, serviceSnapshot as AuthMachineState)
    : [];

  return {
    ...rest,
    fields,
    getTotpSecretCode: getTotpSecretCodeCallback(user),
    route,
    user,
    /** @deprecated For internal use only */
    _state: serviceSnapshot,
    /** @deprecated For internal use only */
    _send: send,
  };
}
