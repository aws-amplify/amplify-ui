import React from 'react';

import { Button, Card, Flex, Text } from '../../../primitives';
import { ButtonComponent } from '../types';
import { DefaultErrorMessage } from '../shared/Defaults';
import {
  DeleteUserComponents,
  WarningViewComponent,
  WarningViewProps,
} from './types';
import { defaultDeleteUserDisplayText } from '../utils';

const DefaultWarningView: WarningViewComponent = ({
  displayText: overrideDisplayText,
  isDisabled,
  onCancel,
  onConfirm,
}: WarningViewProps) => {
  // translations
  const displayText = {
    ...defaultDeleteUserDisplayText,
    ...overrideDisplayText,
  };
  const { cancelText, deleteMyAccountText, warningText } = displayText;

  return (
    <Card>
      <Flex direction="column">
        <Text color="font.error">{warningText}</Text>
        <Flex>
          <Button variation="link" onClick={onCancel} isDisabled={isDisabled}>
            {cancelText}
          </Button>
          <Button
            variation="destructive"
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

const DefaultDeleteButton: ButtonComponent = (props) => (
  <Button {...props} variation="warning" />
);

const DEFAULTS: Required<DeleteUserComponents> = {
  ErrorMessage: DefaultErrorMessage,
  DeleteButton: DefaultDeleteButton,
  WarningView: DefaultWarningView,
};

export default DEFAULTS;
