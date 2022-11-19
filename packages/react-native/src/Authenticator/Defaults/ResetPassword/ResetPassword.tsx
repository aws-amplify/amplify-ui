import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import {
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultResetPasswordComponent } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'ResetPassword';
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
  handleBlur,
  handleChange,
  handleSubmit,
  Header,
  isPending,
  toSignIn,
}) => {
  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  return (
    <>
      <Header>{getResetYourPasswordText()}</Header>
      <FormFields fields={fieldsWithHandlers} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        variant="primary"
        onPress={handleFormSubmit}
        style={styles.buttonPrimary}
      >
        {isPending ? getSendingText() : getSendCodeText()}
      </Button>
      <Button onPress={toSignIn} variant="link" style={styles.buttonSecondary}>
        {getBackToSignInText()}
      </Button>
      <Footer />
    </>
  );
};

ResetPassword.Footer = DefaultFooter;
ResetPassword.FormFields = DefaultTextFormFields;
ResetPassword.Header = DefaultHeader;

ResetPassword.displayName = COMPONENT_NAME;
export default ResetPassword;
