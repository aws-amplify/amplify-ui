import React from 'react';

import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import {
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmSignInComponent } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'ConfirmSignIn';

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
      <Header>{getChallengeText(challengeName)}</Header>
      <FormFields fields={fieldsWithHandlers} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        variant="primary"
        onPress={handleFormSubmit}
        style={styles.buttonPrimary}
      >
        {isPending ? getConfirmingText() : getConfirmText()}
      </Button>
      <Button onPress={toSignIn} variant="link" style={styles.buttonSecondary}>
        {getBackToSignInText()}
      </Button>
      <Footer />
    </>
  );
};

ConfirmSignIn.Footer = DefaultFooter;
ConfirmSignIn.FormFields = DefaultTextFormFields;
ConfirmSignIn.Header = DefaultHeader;

ConfirmSignIn.displayName = COMPONENT_NAME;
export default ConfirmSignIn;
