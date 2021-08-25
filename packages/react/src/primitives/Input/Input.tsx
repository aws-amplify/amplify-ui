import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared';
import { InputProps } from '../types/input';
import { View } from '../View';

export const Input: React.FC<InputProps> = ({
  autoComplete,
  className,
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
  onChange,
  onCopy,
  onCut,
  onInput,
  onPaste,
  onSelect,
  ...rest
}) => (
  <View
    aria-invalid={hasError}
    as="input"
    autoComplete={autoComplete}
    className={classNames(ComponentClassNames.TextFieldInput, className)}
    data-size={size}
    data-variation={variation}
    defaultValue={defaultValue}
    disabled={isDisabled}
    id={id}
    onChange={onChange}
    onCopy={onCopy}
    onCut={onCut}
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
