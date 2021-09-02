import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared';
import { InputProps } from '../types/input';
import { View } from '../View';

export const Input: React.FC<InputProps> = ({
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
    className={classNames(
      ComponentClassNames.Input,
      ComponentClassNames.FieldGroupControl,
      className
    )}
    data-size={size}
    data-variation={variation}
    defaultValue={defaultValue}
    isDisabled={isDisabled}
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
