import React from 'react';
import {
  authenticatorTextUtil,
  censorAllButFirstAndLast,
  censorPhoneNumber,
} from '@aws-amplify/ui';

import { Button, ErrorMessage, Radio, RadioGroup } from '../../../primitives';
import { DefaultFooter } from '../../common/DefaultFooter';
import { DefaultHeader } from '../../common/DefaultHeader';
import { useFieldValues } from '../../hooks';
import { DefaultVerifyUserComponent } from '../types';

import { styles } from './styles';

const COMPONENT_NAME = 'VerifyUser';

//TODO: add getVerifyingText util
const { getSkipText, getVerifyText, getAccountRecoveryInfoText } =
  authenticatorTextUtil;

const censorContactInformation = (type: string, value: string): string => {
  let censoredVal = value;
  if (type === 'Email') {
    const splitEmail = value.split('@');
    const censoredName = censorAllButFirstAndLast(splitEmail[0]);

    censoredVal = `${censoredName}@${splitEmail[1]}`;
  } else if (type === 'Phone Number') {
    censoredVal = censorPhoneNumber(value);
  }
  return censoredVal;
};

const VerifyUser: DefaultVerifyUserComponent = ({
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
      <Button
        onPress={handleFormSubmit}
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
      {fields.map(({ label, name, value, ...props }) => (
        <Radio
          {...props}
          key={name}
          value={name}
          label={censorContactInformation(label, value)}
        />
      ))}
    </RadioGroup>
  );
};

VerifyUser.Footer = DefaultFooter;
VerifyUser.FormFields = FormFields;
VerifyUser.Header = DefaultHeader;

VerifyUser.displayName = COMPONENT_NAME;
export default VerifyUser;
