import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ForceNewPasswordStyle {
  container: StyleProp<ViewStyle>;
}

export type ForceNewPasswordComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ForceNewPasswordStyle }
>['ForceNewPassword'];
