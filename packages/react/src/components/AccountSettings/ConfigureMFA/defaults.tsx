import React from 'react';

import { translate } from '@aws-amplify/ui';

import {
  Alert,
  Button,
  Flex,
  RadioGroupField,
  Text,
} from '../../../primitives';
import { SelectMFAProps } from './types';

export const DefaultEnableMFAButton = Button;

export const DefaultSelectMFA = ({
  children,
  onCancel,
  onChange,
  onContinue,
  selection,
  showWarning,
}: SelectMFAProps): JSX.Element => {
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
    <>
      {showWarning ? <Alert>{changeMFAWarningText}</Alert> : null}
      <Text>{mfaDescriptionText}</Text>
      <RadioGroupField
        label={translate(mfaTypeText)}
        name="mfaType"
        labelHidden
        value={selection}
        onChange={onChange}
      >
        {children}
      </RadioGroupField>
      <Flex justifyContent="space-between">
        <Button variation="link" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variation="primary" onClick={onContinue}>
          {continueText}
        </Button>
      </Flex>
    </>
  );
};
