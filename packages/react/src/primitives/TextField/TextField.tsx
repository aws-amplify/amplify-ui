import classNames from 'classnames';
import React from 'react';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ComponentClassNames } from '../shared';
import { TextFieldProps } from '../types';
import { View } from '../View';
import { Text } from '../Text';
import { useTextField } from '@react-aria/textfield';

export const TextField: React.FC<TextFieldProps> = (props) => {
  let {
    id,
    alignContent,
    alignItems,
    autoComplete,
    className,
    defaultValue,
    descriptiveText,
    direction = 'column',
    gap,
    hasError,
    isDisabled,
    isReadOnly,
    isRequired,
    justifyContent,
    label,
    labelHidden = false,
    // onBlur,
    // onChange,
    // onFocus,
    size,
    type = 'text',
    value,
    wrap,
    ...rest
  } = props;
  let ref = React.useRef<HTMLInputElement>();
  let textField = useTextField(props, ref);
  let inputProps =
    textField.inputProps as React.InputHTMLAttributes<HTMLInputElement>;

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(ComponentClassNames.TextField, className)}
      data-disabled={isDisabled}
      data-readonly={isReadOnly}
      data-required={isRequired}
      data-size={size}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      wrap={wrap}
    >
      {labelHidden ? null : (
        <Label htmlFor={id} {...textField.labelProps}>
          {label}
        </Label>
      )}
      {descriptiveText ? (
        <Text className={ComponentClassNames.TextFieldDescription}>
          {descriptiveText}
        </Text>
      ) : null}
      <Flex className={ComponentClassNames.FieldWrapper}>
        <input
          id={id}
          ref={ref}
          autoComplete={autoComplete}
          aria-label={labelHidden ? label.toString() : null}
          className={ComponentClassNames.TextFieldInput}
          defaultValue={defaultValue}
          disabled={isDisabled}
          // onBlur={onBlur}
          // onChange={onChange}
          // onFocus={onFocus}
          readOnly={isReadOnly}
          required={isRequired}
          type={type}
          value={value}
          data-size={size}
          {...inputProps}
          {...rest}
        />
      </Flex>
    </Flex>
  );
};
