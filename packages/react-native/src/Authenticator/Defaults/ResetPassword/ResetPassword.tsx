import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Button, ErrorMessage, TextField } from '../../../primitives';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { DefaultResetPasswordComponent } from '../types';
import { styles } from './styles';

// strings to import
const RESET_YOUR_PASSWORD = 'Reset your password';
const ENTER_YOUR_USERNAME = 'Enter your username';
const SEND_CODE = 'Send code';
const SENDING = 'Sending';
const BACK_TO_SIGN_IN = 'Back to Sign In';

const ResetPassword: DefaultResetPasswordComponent = ({
  error,
  Footer,
  Header,
  isPending,
  toSignIn,
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
      <TextField placeholder={ENTER_YOUR_USERNAME} style={styles.textField} />
      {error ? (
        <ErrorMessage style={styles.errorMessage}>{error}</ErrorMessage>
      ) : null}
      <Button style={buttonPrimaryStyle} textStyle={styles.buttonPrimaryText}>
        {isPending ? SENDING : SEND_CODE}
      </Button>
      <Button
        onPress={toSignIn}
        style={buttonSecondaryStyle}
        textStyle={styles.buttonSecondary}
      >
        {BACK_TO_SIGN_IN}
      </Button>
      <Footer />
    </View>
  );
};

ResetPassword.Footer = DefaultFooter;
ResetPassword.FormFields = DefaultFormFields;
ResetPassword.Header = DefaultHeader;

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
