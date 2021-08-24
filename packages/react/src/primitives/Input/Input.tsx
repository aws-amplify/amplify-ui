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
  hasError,
  value,
  onChange,
  onBeforeInput,
  onCopy,
  onCut,
  onInput,
  onPaste,
  onSelect,
  ...rest
}) => (
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
    onChange={onChange}
    onBeforeInput={onBeforeInput}
    onCopy={onCopy}
    onCut={onCut}
    onInput={onInput}
    onPaste={onPaste}
    onSelect={onSelect}
    {...rest}
  />
);
