import React from 'react';

import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { Button, ErrorMessage, Radio, RadioGroup } from '../../../primitives';
import { DefaultVerifyUserComponent } from '../types';
import { authenticatorTextUtil } from '@aws-amplify/ui';
import { styles } from './styles';

//TODO: add getVerifyingText util
const { getSkipText, getVerifyText, getAccountRecoveryInfoText } =
  authenticatorTextUtil;

const VerifyUser: DefaultVerifyUserComponent = ({
  error,
  fields,
  FormFields,
  Footer,
  Header,
  isPending,
  skipVerification,
}) => {
  return (
    <>
      <Header>{getAccountRecoveryInfoText()}</Header>
      <FormFields isPending={isPending} fields={fields} />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        style={styles.buttonPrimary}
        textStyle={styles.buttonPrimaryLabel}
      >
        {isPending ? 'Verifying...' : getVerifyText()}
      </Button>
      <Button
        onPress={skipVerification}
        style={styles.buttonSecondary}
        textStyle={styles.buttonSecondaryLabel}
      >
        {getSkipText()}
      </Button>
      <Footer />
    </>
  );
};

const FormFields: DefaultVerifyUserComponent['FormFields'] = ({
  fields,
  isPending,
}) => {
  return (
    <RadioGroup disabled={isPending}>
      {fields.map(({ name, ...props }) => (
        <Radio {...props} key={name} />
      ))}
    </RadioGroup>
  );
};
VerifyUser.Footer = DefaultFooter;
VerifyUser.FormFields = FormFields;
VerifyUser.Header = DefaultHeader;

VerifyUser.displayName = 'VerifyUser';
export default VerifyUser;
