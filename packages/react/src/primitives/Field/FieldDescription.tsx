import * as React from 'react';
import { FieldDescriptionProps } from '../types/field';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const FieldDescription: React.FC<FieldDescriptionProps> = ({
  descriptiveText,
  labelHidden,
  ...rest
}) => {
  return !labelHidden && descriptiveText ? (
    <Text className={ComponentClassNames.FieldDescription} {...rest}>
      {descriptiveText}
    </Text>
  ) : null;
};
