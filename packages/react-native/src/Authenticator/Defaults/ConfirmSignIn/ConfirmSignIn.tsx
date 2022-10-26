import React from 'react';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { DefaultConfirmSignInComponent } from '../types';
import { styles } from './styles';

const {
  getBackToSignInText,
  getChallengeText,
  getConfirmText,
  getConfirmingText,
} = authenticatorTextUtil;

const ConfirmSignIn: DefaultConfirmSignInComponent = ({
  challengeName,
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
      <Header>{getChallengeText(challengeName)}</Header>
      <FormFields fields={fields} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? getConfirmingText() : getConfirmText()}
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

ConfirmSignIn.Footer = DefaultFooter;
ConfirmSignIn.FormFields = DefaultFormFields;
ConfirmSignIn.Header = DefaultHeader;

ConfirmSignIn.displayName = 'ConfirmSignIn';
export default ConfirmSignIn;
