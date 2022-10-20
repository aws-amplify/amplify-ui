import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ConfirmSignInStyle {
  container: StyleProp<ViewStyle>;
}

export type ConfirmSignInComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ConfirmSignInStyle }
>['ConfirmSignIn'];
