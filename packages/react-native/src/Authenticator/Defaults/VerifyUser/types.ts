import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface VerifyUserStyle {
  container: StyleProp<ViewStyle>;
}

export type VerifyUserComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: VerifyUserStyle }
>['VerifyUser'];
