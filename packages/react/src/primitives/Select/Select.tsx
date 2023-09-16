import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { Flex } from '../Flex';
import { IconExpandMore, useIcons } from '../Icon';
import { ForwardRefPrimitive, Primitive } from '../types';
import { BaseSelectProps, SelectProps } from '../types/select';
import { View } from '../View';
import { useFieldset } from '../Fieldset/useFieldset';

const SelectPrimitive: Primitive<SelectProps, 'select'> = (
  {
    autoComplete,
    className,
    size,
    variation,
    value,
    defaultValue,
    hasError,
    icon,
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
  const componentClasses = classNames(
    ComponentClassName.Select,
    ComponentClassName.FieldGroupControl,
    classNameModifier(ComponentClassName.Select, size),
    classNameModifier(ComponentClassName.Select, variation),
    classNameModifierByFlag(ComponentClassName.Select, 'error', hasError),
    className
  );
  const icons = useIcons('select');
  const { isFieldsetDisabled } = useFieldset();

  return (
    <View className={ComponentClassName.SelectWrapper}>
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
        isDisabled={isFieldsetDisabled ? isFieldsetDisabled : isDisabled}
        required={isRequired}
        className={componentClasses}
        ref={ref}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </View>
      <Flex
        className={classNames(
          ComponentClassName.SelectIconWrapper,
          classNameModifier(ComponentClassName.SelectIconWrapper, size)
        )}
        color={iconColor}
      >
        {icon ?? icons?.expand ?? <IconExpandMore />}
      </Flex>
    </View>
  );
};

export const Select: ForwardRefPrimitive<BaseSelectProps, 'select'> =
  React.forwardRef(SelectPrimitive);

Select.displayName = 'Select';
