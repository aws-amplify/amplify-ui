import * as React from 'react';
import classNames from 'classnames';

import { FieldDescriptionProps, Primitive } from '../types';
import { Text } from '../Text';
import { ComponentClassNames } from '../shared/constants';

export const QA_FIELD_DESCRIPTION = 'qa-field-description';

const FieldDescriptionPrimitive: Primitive<FieldDescriptionProps, 'p'> = (
  { children, labelHidden, ...rest },
  ref
) =>
  children ? (
    <Text
      data-testid={QA_FIELD_DESCRIPTION}
      className={classNames(ComponentClassNames.FieldDescription, {
        [ComponentClassNames.VisuallyHidden]: labelHidden,
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </Text>
  ) : null;

export const FieldDescription = React.forwardRef(FieldDescriptionPrimitive);

FieldDescription.displayName = 'FieldDescription';
