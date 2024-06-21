import * as React from 'react';
import { fieldGroupClasses, inputClasses } from '@aws-amplify/ui';

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
  const { isFieldsetDisabled } = useFieldset();

  return (
    <View
      aria-invalid={hasError}
      as="input"
      autoComplete={autoComplete}
      checked={checked}
      className={inputClasses(
        {
          _modifiers: [size, variation, hasError ? 'error' : undefined],
        },
        [fieldGroupClasses({ _element: 'control' }), className]
      )}
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
