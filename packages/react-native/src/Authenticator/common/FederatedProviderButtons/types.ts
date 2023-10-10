import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { AuthenticatorMachineContext } from '@aws-amplify/ui-react-core';

export interface FederatedProviderButtonsProps
  extends Pick<
      AuthenticatorMachineContext,
      'route' | 'socialProviders' | 'toFederatedSignIn'
    >,
    ViewProps {
  buttonStyle?: StyleProp<ViewStyle>;
  dividerLabelStyle?: StyleProp<TextStyle>;
}

export interface FederatedProviderButtonStyle {
  button: ViewStyle;
  container: ViewStyle;
  dividerLabel: TextStyle;
}
