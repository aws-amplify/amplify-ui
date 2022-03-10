import * as React from 'react';
import classNames from 'classnames';

import { FieldDescriptionProps } from '../types';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const QA_FIELD_DESCRIPTION = 'qa-field-description';

export const FieldDescription: React.FC<FieldDescriptionProps> = ({
  descriptiveText,
  labelHidden,
  ...rest
}) =>
  descriptiveText ? (
    <Text
      data-testid={QA_FIELD_DESCRIPTION}
      className={classNames(ComponentClassNames.FieldDescription, {
        [ComponentClassNames.VisuallyHidden]: labelHidden,
      })}
      {...rest}
    >
      {descriptiveText}
    </Text>
  ) : null;

FieldDescription.displayName = 'FieldDescription';
