import * as React from 'react';
import classNames from 'classnames';

import { FieldDescriptionProps } from '../types';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const FieldDescription: React.FC<FieldDescriptionProps> = ({
  descriptiveText,
  labelHidden,
  ...rest
}) => (
  <Text
    className={classNames(ComponentClassNames.FieldDescription, {
      [ComponentClassNames.VisuallyHidden]: labelHidden,
    })}
    {...rest}
  >
    {descriptiveText}
  </Text>
);

FieldDescription.displayName = 'FieldDescription';
