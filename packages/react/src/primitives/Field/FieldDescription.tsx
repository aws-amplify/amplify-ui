import * as React from 'react';
import { fieldClasses } from '@aws-amplify/ui';

import { BaseFieldDescriptionProps } from '../types';
import { Text } from '../Text';

export const QA_FIELD_DESCRIPTION = 'qa-field-description';

export const FieldDescription: React.FC<BaseFieldDescriptionProps> = ({
  descriptiveText,
  labelHidden,
  ...rest
}) =>
  descriptiveText ? (
    <Text
      data-testid={QA_FIELD_DESCRIPTION}
      className={fieldClasses({ _element: 'description' }, [
        labelHidden ? 'amplify-visually-hidden' : undefined,
      ])}
      {...rest}
    >
      {descriptiveText}
    </Text>
  ) : null;

FieldDescription.displayName = 'FieldDescription';
