import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultForceNewPasswordComponent } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'ForceNewPassword';

const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

const ForceNewPassword: DefaultForceNewPasswordComponent = ({
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
      <Header>{getChangePasswordText()}</Header>
      <FormFields fields={fieldsWithHandlers} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        onPress={handleFormSubmit}
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

ForceNewPassword.displayName = COMPONENT_NAME;
export default ForceNewPassword;
