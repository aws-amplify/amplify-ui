import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { AuthenticatorMachineContext } from '@aws-amplify/ui-react-core';

export interface FederatedProviderButtonsProps
  extends Pick<
      AuthenticatorMachineContext,
      'route' | 'socialProviders' | 'toFederatedSignIn'
    >,
    ViewProps {
  /*
   * @description
   * Styles for the buttons
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /*
   * @description
   * Styles for the divider text
   */
  textStyle?: StyleProp<TextStyle>;

  /*
   * @description
   * Styles for the divider line
   */
  dividerStyle?: StyleProp<ViewStyle>;
}

export interface FederatedProviderButtonStyle {
  button: ViewStyle;
  container: ViewStyle;
  divider: ViewStyle;
  text: TextStyle;
}
