import { TextStyle, ViewStyle } from 'react-native';

import { AuthenticatorMachineContext } from '@aws-amplify/ui-react-core';

// TODO extend from ViewProps, add button style related style props
export interface FederatedProviderButtonsProps
  extends Pick<
    AuthenticatorMachineContext,
    'socialProviders' | 'toFederatedSignIn'
  > {}

export interface FederatedProviderButtonStyle {
  button: ViewStyle;
  container: ViewStyle;
  text: TextStyle;
}
