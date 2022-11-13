import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Button, Flex, TextField, View } from '../../../../primitives';
import { VerifySMSProps } from '../types';

export const VerifySMS = ({
  onCancel,
  onSubmit,
  onChange,
}: VerifySMSProps): JSX.Element => {
  // translations
  const verificationCodeText = translate('Verification Code');
  const descriptiveText = translate(
    'Please enter the verification code we sent to your phone number'
  );
  const backText = translate('Back');

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        <TextField
          onChange={onChange}
          name="code"
          label={verificationCodeText}
          descriptiveText={descriptiveText}
        />
        <Flex direction="row" justifyContent="space-between">
          <Button type="submit" variation="link" onClick={onCancel}>
            {backText}
          </Button>
          <Button variation="primary">Confirm</Button>
        </Flex>
      </Flex>
    </View>
  );
};
