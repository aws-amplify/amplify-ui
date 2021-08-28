import classNames from 'classnames';
import * as React from 'react';
import { Flex } from '../Flex';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupOptions } from '../types';

export const FieldGroup: React.FC<FieldGroupOptions> = ({
  children,
  className,
  ...rest
}) => {
  const hasMultipleFields = React.Children.toArray(children).length > 1;

  // Don't apply field group classname unless there are multiple fields
  const fieldGroupClassName = hasMultipleFields
    ? ComponentClassNames.FieldGroup
    : null;

  return (
    <Flex className={classNames(fieldGroupClassName, className)} {...rest}>
      {children}
    </Flex>
  );
};
