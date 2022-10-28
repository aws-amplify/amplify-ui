import React from 'react';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../../common/DefaultFormFields';
import { FederatedProviderButtons } from '../../common/FederatedProviderButtons';

import { DefaultSignUpComponent } from '../types';
import { Button, ErrorMessage, Tab, Tabs } from '../../../primitives';
import { authenticatorTextUtil } from '@aws-amplify/ui';
import { styles } from './style';

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
  hideSignIn,
  isPending,
  socialProviders,
  toFederatedSignIn,
  toSignIn,
  validationErrors,
}) => {
  return (
    <>
      {hideSignIn ? null : (
        <Tabs style={styles.tabs} selectedIndex={1}>
          <Tab onPress={toSignIn}>{getSignInTabText()}</Tab>
          <Tab>{getSignUpTabText()}</Tab>
        </Tabs>
      )}
      <Header />
      {socialProviders ? (
        <FederatedProviderButtons
          socialProviders={socialProviders}
          toFederatedSignIn={toFederatedSignIn}
        />
      ) : null}
      <FormFields
        isPending={isPending}
        fields={fields}
        validationErrors={validationErrors}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getCreatingAccountText() : getCreateAccountText()}
      </Button>
      <Footer />
    </>
  );
};

SignUp.Footer = DefaultFooter;
SignUp.FormFields = DefaultFormFields;
SignUp.Header = DefaultHeader;

SignUp.displayName = 'SignUp';
export default SignUp;
