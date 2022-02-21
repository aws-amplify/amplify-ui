import * as React from 'react';

import { FieldDescriptionProps } from '../types';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const FieldDescription: React.FC<FieldDescriptionProps> = ({
  descriptiveText,
  isLabelHidden,
  ...rest
}) => {
  return !isLabelHidden && descriptiveText ? (
    <Text className={ComponentClassNames.FieldDescription} {...rest}>
      {descriptiveText}
    </Text>
  ) : null;
};

FieldDescription.displayName = 'FieldDescription';
