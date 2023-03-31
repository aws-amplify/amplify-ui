import * as React from 'react';
import { FieldErrorMessageProps } from '../types/field';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const FieldErrorMessage: React.FC<FieldErrorMessageProps> = ({
  children,
  hasError,
  ...rest
}) => {
  return hasError && children ? (
    <Text className={ComponentClassNames.FieldErrorMessage} {...rest}>
      {children}
    </Text>
  ) : null;
};

FieldErrorMessage.displayName = 'FieldErrorMessage';
