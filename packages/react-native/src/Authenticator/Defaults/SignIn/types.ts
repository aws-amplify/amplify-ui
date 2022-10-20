import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface SignInStyle {
  container: StyleProp<ViewStyle>;
}

export type SignInComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: SignInStyle }
>['SignIn'];
