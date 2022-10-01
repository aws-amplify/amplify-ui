import React from 'react';

import {
  resolveAuthenticatorComponents,
  useAuthenticatorRoute,
} from '@aws-amplify/ui-react-core';

import { ConfirmSignIn, SetupTOTP } from './components';
import { AuthenticatorProps, ComponentDefaults } from './types';

const DEFAULTS: ComponentDefaults = {
  ConfirmSignIn,
  SetupTOTP,
  // TODO: remove cast after adding missing components
} as ComponentDefaults;

export default function Authenticator({
  components: overrides,
}: AuthenticatorProps): JSX.Element {
  const components = resolveAuthenticatorComponents(DEFAULTS, overrides);

  const { Component, props } = useAuthenticatorRoute({ components });

  return (
    <Component
      {...props}
      onBlur={() => null}
      onChangeText={() => null}
      onSubmit={() => null}
    />
  );
}
