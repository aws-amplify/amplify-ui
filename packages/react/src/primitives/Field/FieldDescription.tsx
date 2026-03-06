import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import type { BaseFieldDescriptionProps } from '../types';
import { Text } from '../Text';
import { ComponentClassName } from '@aws-amplify/ui';

export const QA_FIELD_DESCRIPTION = 'qa-field-description';

export const FieldDescription: React.FC<BaseFieldDescriptionProps> = ({
  descriptiveText,
  labelHidden,
  ...rest
}) =>
  descriptiveText ? (
    <Text
      data-testid={QA_FIELD_DESCRIPTION}
      className={classNames(ComponentClassName.FieldDescription, {
        [ComponentClassName.VisuallyHidden]: labelHidden,
      })}
      {...rest}
    >
      {descriptiveText}
    </Text>
  ) : null;

FieldDescription.displayName = 'FieldDescription';
