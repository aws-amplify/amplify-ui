import React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { IconExpandMore } from '../Icon';
import { SelectProps } from '../types/select';
import { ComponentClassNames } from '../shared';

export const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    size,
    variation,
    value,
    defaultValue,
    hasError,
    icon = <IconExpandMore size="large" />,
    iconColor,
    children,
    placeholder,
    isDisabled,
    isRequired,
    ...rest
  } = props;
  return (
    <View className={ComponentClassNames.SelectWrapper}>
      <View
        aria-invalid={hasError}
        as="select"
        value={value}
        defaultValue={
          value === undefined && defaultValue === undefined && placeholder
            ? ''
            : defaultValue
        }
        isDisabled={isDisabled}
        required={isRequired}
        data-size={size}
        data-variation={variation}
        className={classNames(
          ComponentClassNames.Select,
          ComponentClassNames.FieldGroupControl,
          className
        )}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </View>
      <Flex
        className={ComponentClassNames.SelectIconWrapper}
        alignItems="center"
        justifyContent="center"
        color={iconColor}
      >
        {icon}
      </Flex>
    </View>
  );
};
