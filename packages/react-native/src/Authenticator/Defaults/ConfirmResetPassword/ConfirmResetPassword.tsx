import React from 'react';
import { View } from 'react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultHeader, DefaultFooter, DefaultFormFields } from '../../common';
import { DefaultConfirmResetPasswordComponent } from '../types';
import { styles } from './styles';

const ConfirmResetPassword: DefaultConfirmResetPasswordComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  Header,
  isPending,
  resendCode,
}) => {
  const {
    getResetYourPasswordText,
    getSubmitText,
    getSubmittingText,
    getResendCodeText,
  } = authenticatorTextUtil;

  return (
    <View style={styles.container}>
      <Header>{getResetYourPasswordText()}</Header>
      <FormFields fields={fields} isPending={isPending} />
      {error ? (
        <ErrorMessage style={styles.errorMessage}>{error}</ErrorMessage>
      ) : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getSubmittingText() : getSubmitText()}
      </Button>
      <Button onPress={resendCode} textStyle={styles.buttonSecondaryLabel}>
        {getResendCodeText()}
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
