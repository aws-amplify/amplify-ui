import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmResetPasswordComponent } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'ConfirmResetPassword';

const {
  getResetYourPasswordText,
  getSubmitText,
  getSubmittingText,
  getResendCodeText,
} = authenticatorTextUtil;

const ConfirmResetPassword: DefaultConfirmResetPasswordComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  handleBlur,
  handleChange,
  handleSubmit,
  Header,
  isPending,
  resendCode,
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
      <Button onPress={handleFormSubmit} style={styles.buttonPrimary}>
        {isPending ? getSubmittingText() : getSubmitText()}
      </Button>
      <Button
        onPress={resendCode}
        variant="secondary"
        style={styles.buttonSecondary}
      >
        {getResendCodeText()}
      </Button>
      <Footer />
    </>
  );
};

ConfirmResetPassword.Footer = DefaultFooter;
ConfirmResetPassword.FormFields = DefaultFormFields;
ConfirmResetPassword.Header = DefaultHeader;

ConfirmResetPassword.displayName = COMPONENT_NAME;
export default ConfirmResetPassword;
