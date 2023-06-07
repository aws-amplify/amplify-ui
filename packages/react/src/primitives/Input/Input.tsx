import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassNames } from '../shared';
import {
  BaseInputProps,
  InputProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

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
    onBlur,
    onChange,
    onCopy,
    onCut,
    onFocus,
    onInput,
    onPaste,
    onSelect,
    onWheel,
    ...rest
  },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Input,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Input, variation),
    classNameModifierByFlag(ComponentClassNames.Input, 'error', hasError),
    classNameModifier(ComponentClassNames.Input, size),
    className
  );

  return (
    <View
      aria-invalid={hasError}
      as="input"
      autoComplete={autoComplete}
      checked={checked}
      className={componentClasses}
      data-size={size}
      data-variation={variation}
      defaultChecked={defaultChecked}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      id={id}
      onBlur={onBlur}
      onChange={onChange}
      onCopy={onCopy}
      onCut={onCut}
      onFocus={onFocus}
      onInput={onInput}
      onPaste={onPaste}
      onSelect={onSelect}
      onWheel={onWheel}
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
  React.forwardRef(InputPrimitive);

Input.displayName = 'Input';
