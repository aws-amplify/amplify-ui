import React, { useCallback, useMemo } from 'react';
import { useSelector } from '@xstate/react';
import { AuthMachineState, getServiceFacade } from '@aws-amplify/ui';

import { AuthenticatorContext } from '../../context';

import { USE_AUTHENTICATOR_ERROR } from './constants';
import { UseAuthenticatorSelector, UseAuthenticator } from './types';
import {
  defaultComparator,
  getComparator,
  getMachineFields,
  getTotpSecretCodeCallback,
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

  const facade = useSelector(service, xstateSelector, comparator);

  const { route, unverifiedContactMethods, user, ...rest } = facade;

  // do not memoize output. `service.getSnapshot` reference remains stable preventing
  // `fields` from updating with current form state on value changes
  const serviceSnapshot = service.getSnapshot();

  // legacy `QRFields` values only used for SetupTOTP page to retrieve issuer information, will be removed in future
  const QRFields = useMemo(
    () => getQRFields(serviceSnapshot as AuthMachineState),
    [serviceSnapshot]
  );

  // legacy `formFields` values required until form state is removed from state machine
  const fields = useMemo(
    () =>
      getMachineFields(
        route,
        serviceSnapshot as AuthMachineState,
        unverifiedContactMethods
      ),
    [route, serviceSnapshot, unverifiedContactMethods]
  );

  return {
    ...rest,
    getTotpSecretCode: getTotpSecretCodeCallback(user),
    route,
    unverifiedContactMethods,
    user,
    /** @deprecated For internal use only */
    fields,
    /** @deprecated For internal use only */
    QRFields,
  };
}
