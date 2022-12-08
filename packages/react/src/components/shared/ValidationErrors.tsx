import React from 'react';
import { translate } from '@aws-amplify/ui';

import { View } from '../../primitives/View';
import { Text } from '../../primitives/Text';

export interface ValidationErrorsProps {
  errors: string[];
  id?: string;
  dataAttr?: string;
}
export const ValidationErrors = ({
  errors,
  id,
  dataAttr,
}: ValidationErrorsProps): JSX.Element => {
  if (!(errors?.length > 0)) return null;

  const dataAttrProp = dataAttr ? { [dataAttr]: true } : {};

  return (
    <View {...dataAttrProp} id={id}>
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
