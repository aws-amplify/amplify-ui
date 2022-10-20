import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ResetPasswordStyle {
  container: StyleProp<ViewStyle>;
}

export type ResetPasswordComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ResetPasswordStyle }
>['ResetPassword'];
