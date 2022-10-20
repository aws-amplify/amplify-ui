import { StyleProp, ViewStyle } from 'react-native';

import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';
import { FormHandlers } from '../../types';

export interface SetupTOTPStyle {
  container: StyleProp<ViewStyle>;
}

export type SetupTOTPComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: SetupTOTPStyle }
>['SetupTOTP'];
