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
    value,
    defaultValue,
    icon = <IconExpandMore size="large" />,
    iconColor,
    children,
    placeholder,
    isDisabled,
    isRequired,
    ...rest
  } = props;
  return (
    <View className="amplify-select-wrapper">
      <View
        as="select"
        value={value}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        required={isRequired}
        data-size={size}
        data-variation={variation}
        className={classNames(ComponentClassNames.Select, className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </View>
      <Flex
        className="amplify-select-icon-wrapper"
        alignItems="center"
        justifyContent="center"
        color={iconColor}
      >
        {icon}
      </Flex>
    </View>
  );
};
