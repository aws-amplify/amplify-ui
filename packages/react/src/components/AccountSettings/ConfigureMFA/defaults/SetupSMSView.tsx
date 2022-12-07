import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Button, Flex, PhoneNumberField, View } from '../../../../primitives';
import { SetupSMSViewProps } from '../types';

const SetupSMSView = ({
  formValues,
  isDisabled,
  onCancel,
  onChange,
  onDialCodeChange,
  onSubmit,
}: SetupSMSViewProps): JSX.Element => {
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
          defaultDialCode={dialCode}
          descriptiveText={descriptiveText}
          dialCodeName="dialCode"
          isDisabled={isDisabled}
          label={phoneNumberText}
          name="phoneNumber"
          onChange={onChange}
          onDialCodeChange={onDialCodeChange}
          value={phoneNumber}
        />

        <Flex direction="row" justifyContent="space-between">
          <Button variation="link" onClick={() => onCancel()}>
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

export default SetupSMSView;
