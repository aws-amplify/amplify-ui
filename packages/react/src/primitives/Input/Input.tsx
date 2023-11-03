import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  BaseInputProps,
  InputProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { useFieldset } from '../Fieldset/useFieldset';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const InputPrimitive: Primitive<InputProps, 'input'> = (
  {
    autoComplete,
    checked,
    className,
    defaultChecked,
    defaultValue,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    size,
    type = 'text',
    hasError = false,
    value,
    variation,
    ...rest
  },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassName.Input,
    ComponentClassName.FieldGroupControl,
    classNameModifier(ComponentClassName.Input, variation),
    classNameModifierByFlag(ComponentClassName.Input, 'error', hasError),
    classNameModifier(ComponentClassName.Input, size),
    className
  );
  const { isFieldsetDisabled } = useFieldset();

  return (
    <View
      aria-invalid={hasError}
      as="input"
      autoComplete={autoComplete}
      checked={checked}
      className={componentClasses}
      defaultChecked={defaultChecked}
      defaultValue={defaultValue}
      isDisabled={isFieldsetDisabled ? isFieldsetDisabled : isDisabled}
      id={id}
      readOnly={isReadOnly}
      ref={ref}
      required={isRequired}
      type={type}
      value={value}
      {...rest}
    />
  );
};

export const Input: ForwardRefPrimitive<BaseInputProps, 'input'> =
  primitiveWithForwardRef(InputPrimitive);

Input.displayName = 'Input';
