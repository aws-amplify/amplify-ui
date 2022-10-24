import React, { useContext, useEffect, useMemo } from 'react';
import { useInterpret } from '@xstate/react';
import { createAuthenticatorMachine, listenToAuthHub } from '@aws-amplify/ui';
import { AuthenticatorContext } from './AuthenticatorContext';
export default function AuthenticatorProvider({ children, }) {
    /**
     * Based on use cases, developer might already have added another Provider
     * outside Authenticator. In that case, we sync the two providers by just
     * passing the parent value.
     *
     * TODO(BREAKING): enforce only one provider in App tree
     */
    const parentProviderVal = useContext(AuthenticatorContext);
    const service = useInterpret(createAuthenticatorMachine);
    const value = useMemo(() => (!parentProviderVal ? { service } : parentProviderVal), [parentProviderVal, service]);
    const { service: activeService } = value;
    useEffect(() => {
        const unsubscribe = listenToAuthHub(activeService);
        return unsubscribe;
    }, [activeService]);
    return (React.createElement(AuthenticatorContext.Provider, { value: value }, children));
}
