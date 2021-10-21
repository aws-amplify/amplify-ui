import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { InputProps, Primitive } from '../types';
import { View } from '../View';

export const Input: Primitive<InputProps, 'input'> = ({
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
    onWheel={onWheel}
    readOnly={isReadOnly}
    required={isRequired}
    type={type}
    value={value}
    {...rest}
  />
);
