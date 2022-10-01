import { TextInputProps } from 'react-native';

import { AuthFormData } from '@aws-amplify/ui';
import { AuthenticatorComponentDefaults } from '@aws-amplify/ui-react-core';

export interface FormHandlers {
  onBlur: TextInputProps['onBlur'];
  onChangeText: TextInputProps['onChangeText'];
  onSubmit: (data: AuthFormData) => null;
}

interface ConfirmSignInStyle {}
interface SetupTOTPStyle {}

export type ConfirmSignInComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: ConfirmSignInStyle }
>['ConfirmSignIn'];

export type SetupTOTPComponent = AuthenticatorComponentDefaults<
  FormHandlers & { style?: SetupTOTPStyle }
>['SetupTOTP'];
