import React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { IconExpandMore } from '../Icon';
import { SelectProps } from '../types';
import { ComponentClassNames } from '../shared';

export const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    size,
    variation,
    icon = <IconExpandMore />,
    children,
    placeholder,
    isRequired,
    ...rest
  } = props;
  return (
    <Flex className="amplify-select-wrapper">
      <View
        as="select"
        required={isRequired}
        data-size={size}
        data-variation={variation}
        className={classNames(ComponentClassNames.Select, className)}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </View>
      <Flex alignItems="center">{icon}</Flex>
    </Flex>
  );
};
