import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { useFieldValues } from '../../hooks';

import { Button, ErrorMessage, Tab, Tabs } from '../../../primitives';

import { DefaultSignInComponent } from '../types';

const COMPONENT_NAME = 'SignIn';
interface DefaultSignInStyle {
  buttonPrimary: ViewStyle;
  buttonSecondary: ViewStyle;
  tabs: ViewStyle;
}

const styles: DefaultSignInStyle = StyleSheet.create({
  buttonPrimary: {
    marginVertical: 8,
  },
  buttonSecondary: {
    marginVertical: 8,
  },
  tabs: { marginBottom: 8 },
});

const SignIn: DefaultSignInComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  handleBlur,
  handleChange,
  handleSubmit,
  Header,
  hideSignUp,
  isPending,
  toResetPassword,
  toSignUp,
}) => {
  const {
    getSignInText,
    getSignInTabText,
    getSignUpTabText,
    getForgotPasswordText,
  } = authenticatorTextUtil;

  const { fields: fieldsWithHandlers, handleFormSubmit } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
  });

  return (
    <>
      {hideSignUp ? null : (
        <Tabs style={styles.tabs}>
          <Tab>{getSignInTabText()}</Tab>
          <Tab onPress={toSignUp}>{getSignUpTabText()}</Tab>
        </Tabs>
      )}
      <Header />
      <FormFields fields={fieldsWithHandlers} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button onPress={handleFormSubmit} style={styles.buttonPrimary}>
        {getSignInText()}
      </Button>
      <Footer>
        <Button
          onPress={toResetPassword}
          variant="secondary"
          style={styles.buttonSecondary}
        >
          {getForgotPasswordText()}
        </Button>
      </Footer>
    </>
  );
};

SignIn.Footer = DefaultFooter;
SignIn.FormFields = DefaultFormFields;
SignIn.Header = DefaultHeader;

SignIn.displayName = COMPONENT_NAME;
export default SignIn;
