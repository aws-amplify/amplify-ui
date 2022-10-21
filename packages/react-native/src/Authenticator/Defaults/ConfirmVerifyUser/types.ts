import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface ConfirmVerifyUserStyle {
  container: StyleProp<ViewStyle>;
}

export type ConfirmVerifyUserComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ConfirmVerifyUserStyle }
>['ConfirmVerifyUser'];
