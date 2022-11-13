import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Button, Flex, PhoneNumberField, View } from '../../../../primitives';
import { ConfigureSMSProps } from '../types';

export const ConfigureSMS = ({
  onSubmit,
  onChange,
  onCancel,
  onDialCodeChange,
  formValues,
  hasPhoneNumber,
}: ConfigureSMSProps): JSX.Element => {
  // translations
  const phoneNumberText = translate('Phone Number');
  const descriptiveText = translate('Verification codes will be sent here');
  const backText = translate('Back');
  const sendCodeText = translate('Send code');

  const { dialCode, phoneNumber } = formValues;

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        <PhoneNumberField
          label={phoneNumberText}
          descriptiveText={descriptiveText}
          name="phoneNumber"
          dialCodeName="dialCode"
          isDisabled={hasPhoneNumber}
          onChange={onChange}
          onDialCodeChange={onDialCodeChange}
          defaultDialCode={dialCode}
          value={phoneNumber}
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
