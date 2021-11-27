import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { InputProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const InputPrimitive: PrimitiveWithForwardRef<InputProps, 'input'> = (
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
) => (
  <View
    aria-invalid={hasError}
    as="input"
    autoComplete={autoComplete}
    checked={checked}
    className={classNames(
      ComponentClassNames.Input,
      ComponentClassNames.FieldGroupControl,
      className
    )}
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

export const Input = React.forwardRef(InputPrimitive);

Input.displayName = 'Input';
