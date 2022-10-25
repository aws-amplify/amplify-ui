import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultFooter,
  DefaultFormFields,
  DefaultHeader,
  FederatedProviderButtons,
} from '../../common';

import { Button, ErrorMessage, Tab, Tabs } from '../../../primitives';

import { DefaultSignInComponent } from '../types';

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
  Header,
  hideSignUp,
  isPending,
  socialProviders,
  toResetPassword,
  toFederatedSignIn,
  toSignUp,
}) => {
  const {
    getSignInText,
    getSignInTabText,
    getCreateAccountText,
    getForgotPasswordText,
  } = authenticatorTextUtil;

  return (
    <View style={styles.container}>
      {hideSignUp ? null : (
        <Tabs style={styles.tabs}>
          <Tab>{getSignInTabText()}</Tab>
          <Tab onPress={toSignUp}>{getCreateAccountText()}</Tab>
        </Tabs>
      )}
      <Header />
      {socialProviders ? (
        <FederatedProviderButtons
          socialProviders={socialProviders}
          toFederatedSignIn={toFederatedSignIn}
        />
      ) : null}
      <FormFields fields={fields} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
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
    </View>
  );
};

SignIn.Footer = DefaultFooter;
SignIn.FormFields = DefaultFormFields;
SignIn.Header = DefaultHeader;

SignIn.displayName = 'SignIn';
export default SignIn;
