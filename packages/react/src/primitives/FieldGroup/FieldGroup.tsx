import classNames from 'classnames';
import * as React from 'react';
import { Flex } from '../Flex';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupOptions } from '../types';
import { View } from '../View';

export const FieldGroup: React.FC<FieldGroupOptions> = ({
  children,
  className,
  startComponents,
  endComponents,
  ...rest
}) => {
  const showFieldGroup = startComponents || endComponents;

  // Don't apply field group classname unless there are multiple fields
  const fieldGroupClassName = showFieldGroup
    ? ComponentClassNames.FieldGroup
    : null;

  return (
    <Flex className={classNames(fieldGroupClassName, className)} {...rest}>
      {startComponents && (
        <View className={ComponentClassNames.FieldGroupStart}>
          {startComponents}
        </View>
      )}

      {children}

      {endComponents && (
        <View className={ComponentClassNames.FieldGroupEnd}>
          {endComponents}
        </View>
      )}
    </Flex>
  );
};
