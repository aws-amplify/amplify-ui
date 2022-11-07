import React from 'react';
import { translate } from '@aws-amplify/ui';

import { View } from '../../../primitives/View';
import { Text } from '../../../primitives/Text';

// TODO: consolidate with Authenticator one
export interface ValidationErrorsProps {
  errors: string[];
  id?: string;
}
export const ValidationErrors = ({
  errors,
  id,
}: ValidationErrorsProps): JSX.Element => {
  if (!(errors?.length > 0)) return null;

  return (
    <View data-amplify-validation-errors id={id}>
      {errors.map((error) => {
        return (
          <Text key={error} role="alert" variation="error">
            {translate(error)}
          </Text>
        );
      })}
    </View>
  );
};
