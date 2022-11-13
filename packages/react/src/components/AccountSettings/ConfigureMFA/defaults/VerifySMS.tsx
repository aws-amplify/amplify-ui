import React from 'react';

import { censorPhoneNumber, translate } from '@aws-amplify/ui';

import { Button, Flex, TextField, View } from '../../../../primitives';
import { VerifySMSProps } from '../types';

export const VerifySMS = ({
  phoneNumber,
  onCancel,
  onSubmit,
}: VerifySMSProps): JSX.Element => {
  // censored phone number
  const destination = React.useMemo(
    () => censorPhoneNumber(phoneNumber),
    [phoneNumber]
  );

  // translations
  const verificationCodeText = translate('Verification Code');
  const descriptiveText = `${translate(
    'Please enter the verification code we sent to'
  )} ${destination}`;
  const backText = translate('Back');

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        <TextField
          label={verificationCodeText}
          descriptiveText={descriptiveText}
        />
        <Flex direction="row" justifyContent="space-between">
          <Button variation="link" onClick={onCancel}>
            {backText}
          </Button>
          <Button variation="primary">Confirm</Button>
        </Flex>
      </Flex>
    </View>
  );
};
