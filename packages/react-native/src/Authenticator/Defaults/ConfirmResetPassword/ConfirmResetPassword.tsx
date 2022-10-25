import React from 'react';
import { View } from 'react-native';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultHeader, DefaultFooter, DefaultFormFields } from '../../common';
import { DefaultConfirmResetPasswordComponent } from '../types';
import { styles } from './styles';

// strings to import
const RESET_YOUR_PASSWORD = 'Reset your password';
// const CODE = 'Code';
const NEW_PASSWORD = 'New Password';
const CONFIRM_PASSWORD = 'Confirm Password';
const SUBMIT = 'Submit';
const SUBMITTING = 'Submitting';
const RESEND_CODE = 'Resend Code';

const ConfirmResetPassword: DefaultConfirmResetPasswordComponent = ({
  error,
  Footer = ConfirmResetPassword.Footer,
  Header = ConfirmResetPassword.Header,
  isPending,
  resendCode,
}) => {
  return (
    <View style={styles.container}>
      <Header>{RESET_YOUR_PASSWORD}</Header>
      {error ? (
        <ErrorMessage style={styles.errorMessage}>{error}</ErrorMessage>
      ) : null}
      <Button style={styles.buttonPrimary} textStyle={styles.buttonPrimaryText}>
        {isPending ? SUBMITTING : SUBMIT}
      </Button>
      <Button onPress={resendCode} textStyle={styles.buttonSecondary}>
        {RESEND_CODE}
      </Button>
      <Footer />
    </View>
  );
};

ConfirmResetPassword.Footer = DefaultFooter;
ConfirmResetPassword.FormFields = DefaultFormFields;
ConfirmResetPassword.Header = DefaultHeader;

ConfirmResetPassword.displayName = 'ConfirmResetPassword';
export default ConfirmResetPassword;
