import React from 'react';

import { translate } from '@aws-amplify/ui';

import {
  Alert,
  Button,
  Flex,
  Text,
  RadioGroupField,
  View,
} from '../../../../primitives';
import { SelectMFAViewProps } from '../types';

const SelectMFAView = ({
  children,
  isDisabled,
  onCancel,
  onChange,
  onSubmit,
  selectedMFA,
}: SelectMFAViewProps): JSX.Element => {
  // translations
  const mfaDescriptionText = translate(
    'Multi-factor authentication (MFA) is an extra layer of security for your account.'
  );
  const changeMFAWarningText = translate(
    'You are about to change your multi-factor authentication device. This will invalidate your current device.'
  );
  const cancelText = translate('Cancel');
  const continueText = translate('Continue');
  const mfaTypeText = translate('MFA type');

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        <Alert>{changeMFAWarningText}</Alert>
        <Text>{mfaDescriptionText}</Text>
        <RadioGroupField
          label={translate(mfaTypeText)}
          name="mfaType"
          labelHidden
          onChange={onChange}
          value={selectedMFA}
        >
          {children}
        </RadioGroupField>
        <Flex justifyContent="space-between">
          <Button variation="link" onClick={() => onCancel()}>
            {cancelText}
          </Button>
          <Button isDisabled={isDisabled} variation="primary" type="submit">
            {continueText}
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default SelectMFAView;
