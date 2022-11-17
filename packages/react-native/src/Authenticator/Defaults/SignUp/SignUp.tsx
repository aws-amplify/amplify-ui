import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage, Tab, Tabs } from '../../../primitives';

import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultSignUpComponent } from '../types';

import { styles } from './style';

const COMPONENT_NAME = 'SignUp';

const {
  getCreateAccountText,
  getCreatingAccountText,
  getSignInTabText,
  getSignUpTabText,
} = authenticatorTextUtil;

const SignUp: DefaultSignUpComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  Header,
  handleBlur,
  handleChange,
  handleSubmit,
  hideSignIn,
  isPending,
  toSignIn,
  validationErrors,
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
      {hideSignIn ? null : (
        <Tabs selectedIndex={1} style={styles.tabs}>
          <Tab onPress={toSignIn}>{getSignInTabText()}</Tab>
          <Tab>{getSignUpTabText()}</Tab>
        </Tabs>
      )}
      <Header />
      <FormFields
        isPending={isPending}
        fields={fieldsWithHandlers}
        validationErrors={validationErrors}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button onPress={handleFormSubmit} style={styles.buttonPrimary}>
        {isPending ? getCreatingAccountText() : getCreateAccountText()}
      </Button>
      <Footer />
    </>
  );
};

SignUp.Footer = DefaultFooter;
SignUp.FormFields = DefaultFormFields;
SignUp.Header = DefaultHeader;

SignUp.displayName = COMPONENT_NAME;
export default SignUp;
