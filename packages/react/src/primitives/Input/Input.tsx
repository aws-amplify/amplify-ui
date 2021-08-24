import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared';
import { InputProps } from '../types';
import { View } from '../View';

export const Input: React.FC<InputProps> = (
  {
    autoComplete,
    className,
    defaultValue,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    size,
    type = 'text',
    hasError,
    value,
    ...rest
  },
  ref
) => (
  <View
    as="input"
    aria-invalid={hasError}
    autoComplete={autoComplete}
    className={classNames(ComponentClassNames.TextFieldInput, className)}
    data-size={size}
    defaultValue={defaultValue}
    disabled={isDisabled}
    id={id}
    readOnly={isReadOnly}
    required={isRequired}
    type={type}
    value={value}
    {...rest}
  />
);
