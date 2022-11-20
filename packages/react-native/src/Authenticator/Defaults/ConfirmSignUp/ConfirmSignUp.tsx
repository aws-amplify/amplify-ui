import React from 'react';
import { Text } from 'react-native';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import {
  DefaultFooter,
  DefaultTextFormFields,
  DefaultHeader,
} from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmSignUpComponent } from '../types';
import { styles } from './style';

const COMPONENT_NAME = 'ConfirmSignUp';

const {
  getDeliveryMethodText,
  getDeliveryMessageText,
  getConfirmingText,
  getConfirmText,
  getResendCodeText,
} = authenticatorTextUtil;

const ConfirmSignUp: DefaultConfirmSignUpComponent = ({
  codeDeliveryDetails,
  error,
  fields,
  Footer,
  FormFields,
  Header,
  handleBlur,
  handleChange,
  handleSubmit,
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
      <Header>{getDeliveryMethodText(codeDeliveryDetails)}</Header>
      <Text>{getDeliveryMessageText(codeDeliveryDetails)}</Text>
      <FormFields fields={fieldsWithHandlers} isPending={isPending} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        variant="primary"
        onPress={handleFormSubmit}
        style={styles.buttonPrimary}
      >
        {isPending ? getConfirmingText() : getConfirmText()}
      </Button>

      <Button onPress={resendCode} style={styles.buttonSecondary}>
        {getResendCodeText()}
      </Button>
      <Footer />
    </>
  );
};

ConfirmSignUp.FormFields = DefaultTextFormFields;
ConfirmSignUp.Footer = DefaultFooter;
ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.displayName = COMPONENT_NAME;
export default ConfirmSignUp;
