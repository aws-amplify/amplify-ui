import React from 'react';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { DefaultFormFields } from '../FormFields';
import { FederatedProviderButtons } from '../../common/FederatedProviderButtons';
import { DefaultSignUpComponent } from '../types';
import { Button, ErrorMessage } from '../../../primitives';

import { styles } from './style';

// strings to import
const BACK_TO_SIGN_IN = 'Already have an account? Sign In.';
const CREATE_ACCOUNT = 'Create account';
const CREATING_ACCOUNT = 'Creating account';
const ENTER_YOUR_USERNAME = 'Enter your username';

const SignUp: DefaultSignUpComponent = ({
  error,
  fields,
  Footer,
  FormFields,
  Header,
  isPending,
  socialProviders,
  toFederatedSignIn,
}) => {
  return (
    <>
      <Header />
      {socialProviders ? (
        <FederatedProviderButtons
          socialProviders={socialProviders}
          toFederatedSignIn={toFederatedSignIn}
        />
      ) : null}
      <FormFields isPending={isPending} fields={fields} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        Sign Up
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
