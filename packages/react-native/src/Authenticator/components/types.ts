import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import { AuthFormData } from '@aws-amplify/ui';
import {
  DefaultConfirmSignInComponent,
  DefaultSetupTOTPComponent,
} from '@aws-amplify/ui-react-core';

export interface FormHandlers {
  onBlur: TextInputProps['onBlur'];
  onChangeText: TextInputProps['onChangeText'];
  onSubmit: (data: AuthFormData) => null;
}

interface ConfirmSignInStyle {
  container?: StyleProp<ViewStyle>;
}
interface SetupTOTPStyle {
  container?: StyleProp<ViewStyle>;
}

interface PlatformProps<Style> extends FormHandlers {
  style?: Style;
}

export type ConfirmSignInComponent = DefaultConfirmSignInComponent<
  PlatformProps<ConfirmSignInStyle>
>;

export type SetupTOTPComponent = DefaultSetupTOTPComponent<
  PlatformProps<SetupTOTPStyle>
>;
