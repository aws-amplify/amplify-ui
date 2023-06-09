import * as React from 'react';
import { BaseFieldErrorMessageProps } from '../types/field';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const FieldErrorMessage: React.FC<BaseFieldErrorMessageProps> = ({
  errorMessage,
  hasError,
  ...rest
}) => {
  return hasError && errorMessage ? (
    <Text className={ComponentClassNames.FieldErrorMessage} {...rest}>
      {errorMessage}
    </Text>
  ) : null;
};

FieldErrorMessage.displayName = 'FieldErrorMessage';
