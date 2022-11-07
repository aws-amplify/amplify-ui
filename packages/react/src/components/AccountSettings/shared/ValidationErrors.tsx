import React from 'react';
import { translate } from '@aws-amplify/ui';

import { View } from '../../../primitives/View';
import { Text } from '../../../primitives/Text';

// TODO: consolidate with Authenticator one
export interface ValidationErrorsProps {
  errors: string[];
}
export const ValidationErrors = ({
  errors,
}: ValidationErrorsProps): JSX.Element => {
  if (!(errors?.length > 0)) return null;

  return (
    <View>
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
