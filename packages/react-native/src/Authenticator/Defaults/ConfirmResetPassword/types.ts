import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ConfirmResetPasswordStyle {
  container: StyleProp<ViewStyle>;
}

export type ConfirmResetPasswordComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ConfirmResetPasswordStyle }
>['ConfirmResetPassword'];
