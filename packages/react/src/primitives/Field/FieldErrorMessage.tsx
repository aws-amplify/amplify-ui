import * as React from 'react';
import { FieldErrorMessageProps } from '../types/field';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const FieldErrorMessage: React.FC<FieldErrorMessageProps> = ({
  children,
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
