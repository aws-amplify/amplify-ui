import * as React from 'react';
import { fieldClasses } from '@aws-amplify/ui';

import { BaseFieldErrorMessageProps } from '../types/field';
import { Text } from '../Text';

export const FieldErrorMessage: React.FC<BaseFieldErrorMessageProps> = ({
  errorMessage,
  hasError,
  ...rest
}) => {
  return hasError && errorMessage ? (
    <Text className={fieldClasses({ _element: 'error-message' })} {...rest}>
      {errorMessage}
    </Text>
  ) : null;
};

FieldErrorMessage.displayName = 'FieldErrorMessage';
