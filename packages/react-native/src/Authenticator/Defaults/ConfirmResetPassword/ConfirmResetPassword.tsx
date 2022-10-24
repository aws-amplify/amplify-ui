import React, { useCallback } from 'react';
import { View } from 'react-native';

import {
  Button,
  ErrorMessage,
  PasswordField,
  TextField,
} from '../../../primitives';
import { DefaultHeader } from '../../common/DefaultHeader';

import { styles } from './styles';
import { ConfirmResetPasswordComponent } from './types';

// strings to import
const RESET_YOUR_PASSWORD = 'Reset your password';
const CODE = 'Code';
const NEW_PASSWORD = 'New Password';
const CONFIRM_PASSWORD = 'Confirm Password';
const SUBMIT = 'Submit';
const SUBMITTING = 'Submitting';
const RESEND_CODE = 'Resend Code';

const ConfirmResetPassword: ConfirmResetPasswordComponent = ({
  error,
  Footer = ConfirmResetPassword.Footer,
  Header = ConfirmResetPassword.Header,
  isPending,
  resendCode,
}) => {
  const buttonPrimaryStyle = useCallback(
    ({ pressed }) =>
      pressed
        ? { ...styles.buttonPrimary, ...styles.buttonPressed }
        : styles.buttonPrimary,
    []
  );

  const buttonSecondaryStyle = useCallback(
    ({ pressed }) => (pressed ? styles.buttonPressed : undefined),
    []
  );

  return (
    <View style={styles.container}>
      <Header>{RESET_YOUR_PASSWORD}</Header>
      <TextField placeholder={CODE} style={styles.field} />
      <PasswordField placeholder={NEW_PASSWORD} style={styles.field} />
      <PasswordField placeholder={CONFIRM_PASSWORD} style={styles.field} />
      {error ? (
        <ErrorMessage style={styles.errorMessage}>{error}</ErrorMessage>
      ) : null}
      <Button style={buttonPrimaryStyle} textStyle={styles.buttonPrimaryText}>
        {isPending ? SUBMITTING : SUBMIT}
      </Button>
      <Button
        onPress={resendCode}
        style={buttonSecondaryStyle}
        textStyle={styles.buttonSecondary}
      >
        {RESEND_CODE}
      </Button>
      <Footer />
    </View>
  );
};

ConfirmResetPassword.Header = DefaultHeader;

ConfirmResetPassword.Footer = function Footer() {
  return null;
};
ConfirmResetPassword.FormFields = function FormFields() {
  return null;
};

ConfirmResetPassword.displayName = 'ConfirmResetPassword';
export default ConfirmResetPassword;
