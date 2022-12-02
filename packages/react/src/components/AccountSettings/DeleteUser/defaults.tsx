import React from 'react';
import { translate } from '@aws-amplify/ui';

import { Button, Card, Flex, Text } from '../../../primitives';
import { DefaultError } from '../shared/Defaults';
import { DeleteUserComponents, WarningComponent } from './types';

const DefaultWarning: WarningComponent = ({
  onCancel,
  onConfirm,
  isDisabled,
}) => {
  // translations
  // TODO: consolodiate translations to accountSettingsTextUtil
  const warningText = translate(
    'Deleting your account is not reversable. You will lose access to your account and all data associated with it.'
  );
  const cancelText = translate('Cancel');
  const deleteMyAccountText = translate('Delete my account');

  return (
    <Card>
      <Flex direction="column">
        <Text color="font.error">{warningText}</Text>
        <Flex>
          <Button variation="link" onClick={onCancel} isDisabled={isDisabled}>
            {cancelText}
          </Button>
          <Button
            variation="primary"
            onClick={onConfirm}
            isDisabled={isDisabled}
          >
            {deleteMyAccountText}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

const DEFAULTS: Required<DeleteUserComponents> = {
  Error: DefaultError,
  DeleteButton: Button,
  Warning: DefaultWarning,
};

export default DEFAULTS;
