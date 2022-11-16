import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, ErrorMessage } from '../../../primitives';
import { DefaultFooter, DefaultFormFields, DefaultHeader } from '../../common';
import { useFieldValues } from '../../hooks';

import { DefaultConfirmVerifyUserComponent } from '../types';
import { styles } from './styles';

const COMPONENT_NAME = 'ConfirmVerifyUser';

const {
  getAccountRecoveryInfoText,
  getSkipText,
  getSubmitText,
  getSubmittingText,
} = authenticatorTextUtil;

const ConfirmVerifyUser: DefaultConfirmVerifyUserComponent = ({
  error,
  fields,
  FormFields,
  Footer,
  handleBlur,
  handleChange,
  handleSubmit,
  Header,
  isPending,
  skipVerification,
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
      <Header>{getAccountRecoveryInfoText()}</Header>
      <FormFields isPending={isPending} fields={fieldsWithHandlers} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button onPress={handleFormSubmit} style={styles.buttonPrimary}>
        {isPending ? getSubmittingText() : getSubmitText()}
      </Button>
      <Button
        onPress={skipVerification}
        variant="secondary"
        style={styles.buttonSecondary}
      >
        {getSkipText()}
      </Button>
      <Footer />
    </>
  );
};

ConfirmVerifyUser.Footer = DefaultFooter;
ConfirmVerifyUser.FormFields = DefaultFormFields;
ConfirmVerifyUser.Header = DefaultHeader;

ConfirmVerifyUser.displayName = COMPONENT_NAME;
export default ConfirmVerifyUser;
