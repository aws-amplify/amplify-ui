import React from 'react';
import { Text } from 'react-native';

import { FieldErrorsProps } from './types';

export const FieldErrors = ({
  errors,
  style,
}: FieldErrorsProps): JSX.Element | null => {
  if (!(errors?.length > 0)) {
    return null;
  }

  return (
    <>
      {errors.map((error) => (
        <Text key={error} style={style}>
          {error}
        </Text>
      ))}
    </>
  );
};
