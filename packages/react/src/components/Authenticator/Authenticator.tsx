import { translations } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import * as React from 'react';

import { Provider, ProviderProps } from './Provider';
import { Router, RouterProps } from './Router';

export type AuthenticatorProps = ProviderProps & RouterProps;

export function Authenticator({
  children,
  className,
  components,
  initialState,
  loginMechanisms,
  services,
}: AuthenticatorProps) {
  React.useEffect(() => {
    I18n.putVocabularies(translations);
  }, []);

  return (
    <Provider
      components={components}
      initialState={initialState}
      loginMechanisms={loginMechanisms}
      services={services}
    >
      <Router className={className} children={children} />
    </Provider>
  );
}
