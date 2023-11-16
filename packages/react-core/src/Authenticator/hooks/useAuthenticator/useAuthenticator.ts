import React, { useCallback } from 'react';
import { useSelector } from '@xstate/react';
import { AuthMachineState, getServiceFacade } from '@aws-amplify/ui';

import { AuthenticatorContext } from '../../context';

import { USE_AUTHENTICATOR_ERROR } from './constants';
import { UseAuthenticatorSelector, UseAuthenticator } from './types';
import {
  defaultComparator,
  getComparator,
  getMachineFields,
  // getTotpSecretCodeCallback,
  getQRFields,
} from './utils';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#useauthenticator-hook)
 */
export default function useAuthenticator(
  selector?: UseAuthenticatorSelector
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

  // the purpose of `context.authStatus`is to intentionally override `facade.authStatus`. `facade.authStatus` does
  // not update on external sign in events (for example when a user is not using the `Authenticator`).
  const { authStatus } = context;
  const facade = useSelector(service, xstateSelector, comparator);

  const { route, totpSecretCode, unverifiedUserAttributes, user, ...rest } =
    facade;

  // do not memoize output. `service.getSnapshot` reference remains stable preventing
  // `fields` from updating with current form state on value changes
  const serviceSnapshot = service.getSnapshot() as AuthMachineState;

  // legacy `QRFields` values only used for SetupTotp page to retrieve issuer information, will be removed in future
  const QRFields = route === 'setupTotp' ? getQRFields(serviceSnapshot) : null;

  // legacy `formFields` values required until form state is removed from state machine
  const fields = getMachineFields(
    route,
    serviceSnapshot,
    unverifiedUserAttributes
  );

  return {
    ...rest,
    authStatus,
    route,
    totpSecretCode,
    unverifiedUserAttributes,
    user,
    /** @deprecated For internal use only */
    fields,
    QRFields,
  };
}
