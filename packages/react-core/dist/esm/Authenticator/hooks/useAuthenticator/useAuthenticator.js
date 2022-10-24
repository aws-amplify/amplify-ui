import { __rest } from "tslib";
import React, { useCallback, useMemo } from 'react';
import { useSelector } from '@xstate/react';
import { getServiceFacade } from '@aws-amplify/ui';
import { AuthenticatorContext } from '../../context';
import { USE_AUTHENTICATOR_ERROR } from './constants';
import { defaultComparator, getComparator, getLegacyFields, getTotpSecretCodeCallback, } from './utils';
/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#useauthenticator-hook)
 */
export default function useAuthenticator(selector) {
    const context = React.useContext(AuthenticatorContext);
    if (!context) {
        throw new Error(USE_AUTHENTICATOR_ERROR);
    }
    const { service } = context;
    const { send } = service;
    const xstateSelector = useCallback((state) => (Object.assign({}, getServiceFacade({ send, state }))), [send]);
    const comparator = selector ? getComparator(selector) : defaultComparator;
    const facade = useSelector(service, xstateSelector, comparator);
    const { route, user } = facade, rest = __rest(facade, ["route", "user"]);
    // do not memoize output. `service.getSnapshot` reference remains stable preventing
    // `fields` from updating with current form state on value changes
    const serviceSnapshot = service.getSnapshot();
    // legacy `formFields` values required until form state is removed from state machine
    const fields = useMemo(() => getLegacyFields(route, serviceSnapshot), [route, serviceSnapshot]);
    return Object.assign(Object.assign({}, rest), { getTotpSecretCode: getTotpSecretCodeCallback(user), route,
        user,
        /** @deprecated For internal use only */
        fields, 
        /** @deprecated For internal use only */
        _state: serviceSnapshot, 
        /** @deprecated For internal use only */
        _send: send });
}
