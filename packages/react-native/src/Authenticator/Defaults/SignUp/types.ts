import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface SignUpStyle {
  container: StyleProp<ViewStyle>;
}

export type SignUpComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: SignUpStyle }
>['SignUp'];
