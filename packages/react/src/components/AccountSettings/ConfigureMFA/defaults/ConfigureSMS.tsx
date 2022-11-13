import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Button, Flex, PhoneNumberField, View } from '../../../../primitives';
import { ConfigureSMSProps } from '../types';

export const ConfigureSMS = ({
  onSubmit,
  onCancel,
}: ConfigureSMSProps): JSX.Element => {
  // translations
  const phoneNumberText = translate('Phone Number');
  const descriptiveText = translate('Verification codes will be sent here');
  const backText = translate('Back');
  const sendCodeText = translate('Send code');

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        <PhoneNumberField
          label={phoneNumberText}
          descriptiveText={descriptiveText}
        />

        <Flex direction="row" justifyContent="space-between">
          <Button variation="link" onClick={onCancel}>
            {backText}
          </Button>
          <Button variation="primary" type="submit">
            {sendCodeText}
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};
