import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Button, Flex, TextField, View } from '../../../../primitives';
import { VerifySMSViewProps } from '../types';

const VerifySMSView = ({
  onCancel,
  onSubmit,
  onChange,
}: VerifySMSViewProps): JSX.Element => {
  // translations
  const verificationCodeText = translate('Verification Code');
  const descriptiveText = translate(
    'Please enter the verification code we sent to your phone number'
  );
  const backText = translate('Back');
  const confirmText = translate('Confirm');

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        <TextField
          isRequired
          onChange={onChange}
          name="code"
          label={verificationCodeText}
          descriptiveText={descriptiveText}
        />
        <Flex direction="row" justifyContent="space-between">
          <Button type="submit" variation="link" onClick={() => onCancel()}>
            {backText}
          </Button>
          <Button type="submit" variation="primary">
            {confirmText}
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default VerifySMSView;
