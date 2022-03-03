import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { IconExpandMore } from '../Icon';
import { Primitive } from '../types';
import { SelectProps } from '../types/select';
import { View } from '../View';

const SelectPrimitive: Primitive<SelectProps, 'select'> = (
  {
    autoComplete,
    className,
    size,
    variation,
    value,
    defaultValue,
    hasError,
    icon = <IconExpandMore />,
    iconColor,
    children,
    placeholder,
    isDisabled,
    isRequired,
    ...rest
  },
  ref
) => {
  const DEFAULT_PLACEHOLDER_VALUE = '';
  // value === undefined is to make sure that component is used in uncontrolled way so that setting defaultValue is valid
  const shouldSetDefaultPlaceholderValue =
    value === undefined && defaultValue === undefined && placeholder;
  size = size || 'default';
  return (
    <View className={ComponentClassNames.SelectWrapper}>
      <View
        aria-invalid={hasError}
        as="select"
        autoComplete={autoComplete}
        value={value}
        defaultValue={
          shouldSetDefaultPlaceholderValue
            ? DEFAULT_PLACEHOLDER_VALUE
            : defaultValue
        }
        isDisabled={isDisabled}
        required={isRequired}
        data-size={size}
        data-variation={variation}
        className={classNames(
          ComponentClassNames.Select,
          ComponentClassNames.FieldGroupControl,
          `${ComponentClassNames.Select}--size-${size}`,
          className
        )}
        ref={ref}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </View>
      <Flex className={ComponentClassNames.SelectIconWrapper} color={iconColor}>
        {icon}
      </Flex>
    </View>
  );
};

export const Select = React.forwardRef(SelectPrimitive);

Select.displayName = 'Select';
