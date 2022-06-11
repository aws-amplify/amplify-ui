import { translate } from '@aws-amplify/ui';

import { View } from '../../../primitives/View';
import { Text } from '../../../primitives/Text';

export interface ValidationErrorsProps {
  errors: string[];
  id?: string;
}
export const ValidationErrors = ({ errors, id }: ValidationErrorsProps) => {
  if (!(errors?.length > 0)) return null;

  return (
    <View data-amplify-sign-up-errors id={id}>
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
