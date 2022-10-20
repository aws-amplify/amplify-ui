import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ConfirmSignUpStyle {
  container: StyleProp<ViewStyle>;
}

export type ConfirmSignUpComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ConfirmSignUpStyle }
>['ConfirmSignUp'];
