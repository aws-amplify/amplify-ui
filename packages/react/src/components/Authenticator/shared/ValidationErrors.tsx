import { translate } from '@aws-amplify/ui';

import { View } from '../../../primitives/View';
import { Text } from '../../../primitives/Text';

export interface ValidationErrorsProps {
  errors: string[];
}
export const ValidationErrors = ({ errors }: ValidationErrorsProps) => {
  if (!(errors?.length > 0)) return null;

  return (
    <View data-amplify-sign-up-errors>
      {errors.map((error, idx) => {
        return (
          <Text key={error} role="alert" variation="error">
            {translate(error)}
          </Text>
        );
      })}
    </View>
  );
};
