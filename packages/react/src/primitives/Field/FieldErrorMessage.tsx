import * as React from 'react';
import { Primitive, FieldErrorMessageProps } from '../types';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

const FieldErrorMessagePrimitive: Primitive<FieldErrorMessageProps, 'p'> = (
  { children, hasError, ...rest },
  ref
) => {
  return hasError && children ? (
    <Text className={ComponentClassNames.FieldErrorMessage} ref={ref} {...rest}>
      {children}
    </Text>
  ) : null;
};

export const FieldErrorMessage = React.forwardRef(FieldErrorMessagePrimitive);

FieldErrorMessage.displayName = 'FieldErrorMessage';
