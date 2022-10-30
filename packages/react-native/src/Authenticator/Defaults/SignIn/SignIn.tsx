import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { useFieldValues } from '../../hooks';

import { Button, ErrorMessage, Tab, Tabs } from '../../../primitives';

import { DefaultSignInComponent } from '../types';

const COMPONENT_NAME = 'SignIn';

// TODO: clean these up once primitive theming is in place
interface DefaultSignInStyle {
  buttonPrimary: ViewStyle;
  buttonPrimaryLabel: TextStyle;
  buttonSecondary: ViewStyle;
  buttonSecondaryLabel: TextStyle;
  container: ViewStyle;
  tabs: ViewStyle;
}

const styles: DefaultSignInStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  buttonPrimary: {
    backgroundColor: 'teal',
    marginVertical: 8,
    paddingVertical: 12,
  },
  buttonPrimaryLabel: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  buttonSecondary: {
    marginVertical: 8,
    paddingVertical: 12,
  },
  buttonSecondaryLabel: { color: 'teal' },
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
      <Button
        onPress={handleFormSubmit}
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {getSignInText()}
      </Button>
      <Footer>
        <Button
          onPress={toResetPassword}
          style={styles.buttonSecondary}
          textStyle={styles.buttonSecondaryLabel}
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
