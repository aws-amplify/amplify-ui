import React from 'react';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultForceNewPasswordComponent } from '../types';
import { styles } from './styles';

const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

const ForceNewPassword: DefaultForceNewPasswordComponent = ({
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
      <Header>{getChangePasswordText()}</Header>
      <FormFields fields={fields} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getChangingText() : getChangePasswordText()}
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

ForceNewPassword.Footer = DefaultFooter;
ForceNewPassword.FormFields = DefaultFormFields;
ForceNewPassword.Header = DefaultHeader;

ForceNewPassword.displayName = 'ForceNewPassword';
export default ForceNewPassword;
