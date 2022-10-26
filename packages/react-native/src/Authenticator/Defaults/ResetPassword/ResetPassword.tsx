import React from 'react';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultResetPasswordComponent } from '../types';
import { styles } from './styles';

const {
  getResetYourPasswordText,
  getSendCodeText,
  getSendingText,
  getBackToSignInText,
} = authenticatorTextUtil;

const ResetPassword: DefaultResetPasswordComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  Header,
  isPending,
  toSignIn,
}) => {
  return (
    <>
      <Header>{getResetYourPasswordText()}</Header>
      <FormFields fields={fields} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getSendingText() : getSendCodeText()}
      </Button>
      <Button
        onPress={toSignIn}
        style={styles.buttonSecondary}
        textStyle={styles.buttonSecondaryLabel}
      >
        {getBackToSignInText()}
      </Button>
      <Footer />
    </>
  );
};

ResetPassword.Footer = DefaultFooter;
ResetPassword.FormFields = DefaultFormFields;
ResetPassword.Header = DefaultHeader;

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
