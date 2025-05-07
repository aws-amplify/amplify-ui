import * as React from 'react';
import type { BaseFieldErrorMessageProps } from '../types/field';
import { Text } from '../Text';
import { ComponentClassName } from '@aws-amplify/ui';

export const FieldErrorMessage: React.FC<BaseFieldErrorMessageProps> = ({
  errorMessage,
  hasError,
  ...rest
}) => {
  return hasError && errorMessage ? (
    <Text className={ComponentClassName.FieldErrorMessage} {...rest}>
      {errorMessage}
    </Text>
  ) : null;
};

FieldErrorMessage.displayName = 'FieldErrorMessage';
