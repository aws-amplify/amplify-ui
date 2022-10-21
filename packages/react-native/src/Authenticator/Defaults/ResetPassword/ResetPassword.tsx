import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Button, Heading, TextField } from '../../../primitives';

import { styles } from './styles';
import { ResetPasswordComponent } from './types';

// strings to import
const RESET_YOUR_PASSWORD = 'Reset your password';
const ENTER_YOUR_USERNAME = 'Enter your username';
const SEND_CODE = 'Send code';
const BACK_TO_SIGN_IN = 'Back to Sign In';

const ResetPassword: ResetPasswordComponent = () => {
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
      <ResetPassword.Header />
      <ResetPassword.FormFields {...({} as any)} />
      <Heading level={4}>{RESET_YOUR_PASSWORD}</Heading>
      <TextField placeholder={ENTER_YOUR_USERNAME} style={styles.textField} />
      <Button style={buttonPrimaryStyle} textStyle={styles.buttonPrimaryText}>
        {SEND_CODE}
      </Button>
      <Button style={buttonSecondaryStyle} textStyle={styles.buttonSecondary}>
        {BACK_TO_SIGN_IN}
      </Button>
      <ResetPassword.Footer />
    </View>
  );
};

ResetPassword.Header = function Header() {
  return null;
};
ResetPassword.Footer = function Footer() {
  return null;
};
ResetPassword.FormFields = function FormFields() {
  return null;
};

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
