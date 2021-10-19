import { translations } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import * as React from 'react';

import { Provider } from './Provider';
import { Router } from './Router';

export function Authenticator({
  children,
  className = undefined,
  components = undefined,
  initialState = undefined,
  loginMechanisms = undefined,
  services = undefined,
}) {
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
