import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared';
import { InputProps } from '../types/input';
import { View } from '../View';

export const Input: React.FC<InputProps> = ({
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
  ...rest
}) => (
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
    readOnly={isReadOnly}
    required={isRequired}
    type={type}
    value={value}
    {...rest}
  />
);
