import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
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
    isMultiple,
    selectSize = 1,
    ...rest
  },
  ref
) => {
  const DEFAULT_PLACEHOLDER_VALUE = '';
  // value === undefined is to make sure that component is used in uncontrolled way so that setting defaultValue is valid
  const shouldSetDefaultPlaceholderValue =
    value === undefined && defaultValue === undefined && placeholder;
  const componentClasses = classNames(
    ComponentClassNames.Select,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Select, size),
    classNameModifier(ComponentClassNames.Select, variation),
    classNameModifierByFlag(ComponentClassNames.Select, 'error', hasError),
    className
  );
  const icons = useIcons('select');
  const { isFieldsetDisabled } = useFieldset();

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
        isDisabled={isFieldsetDisabled ? isFieldsetDisabled : isDisabled}
        multiple={isMultiple}
        size={selectSize}
        required={isRequired}
        data-size={size}
        data-variation={variation}
        className={componentClasses}
        ref={ref}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </View>
      {isMultiple || selectSize > 1 ? null : (
        <Flex
          className={classNames(
            ComponentClassNames.SelectIconWrapper,
            classNameModifier(ComponentClassNames.SelectIconWrapper, size)
          )}
          color={iconColor}
        >
          {icon ?? icons?.expand ?? <IconExpandMore />}
        </Flex>
      )}
    </View>
  );
};

export const Select: ForwardRefPrimitive<BaseSelectProps, 'select'> =
  React.forwardRef(SelectPrimitive);

Select.displayName = 'Select';
