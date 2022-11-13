import React from 'react';

import { translate } from '@aws-amplify/ui';

import { Button, Flex, Text } from '../../../../primitives';
import { DisplayCurrentMFAProps } from '../types';

export const DisplayCurrentMFA = ({
  currentMFA,
  onUpdateMFA,
  onDisableMFA,
}: DisplayCurrentMFAProps): JSX.Element => {
  // translations
  const mfaTitleText = translate('Multi-factor authentication');
  const enabledText = translate('enabled');
  const disableMFAText = translate('Disable MFA');
  const currentMFAText = translate(currentMFA?.toLowerCase());
  const currentMethodText = translate('Current MFA');
  const updateText = translate('Update');

  return (
    <Flex direction="column">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Text>
          {mfaTitleText}:{' '}
          <Text as="span" fontWeight="bold" color="font.primary">
            {enabledText}
          </Text>
        </Text>
        <Button onClick={onDisableMFA} size="small">
          {disableMFAText}
        </Button>
      </Flex>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Text color="font.secondary">
          {currentMethodText}:{' '}
          <Text as="span" fontWeight="bold" color="font.primary">
            {currentMFAText}
          </Text>
        </Text>
        <Button onClick={onUpdateMFA} size="small">
          {updateText}
        </Button>
      </Flex>
    </Flex>
  );
};
