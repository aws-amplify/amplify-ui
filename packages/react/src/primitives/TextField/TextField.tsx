import classNames from 'classnames';
import * as React from 'react';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ComponentClassNames, useAmplifyFieldID } from '../shared';
import { TextFieldProps } from '../types';
import { Text } from '../Text';
import { Input } from '../Input';

export const TextField: React.FC<TextFieldProps> = (props) => {
  let {
    alignContent,
    alignItems,
    autoComplete,
    className,
    defaultValue,
    descriptiveText,
    direction = 'column',
    errorMessage,
    gap,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    justifyContent,
    label,
    labelHidden = false,
    type = 'text',
    value,
    size,
    onChange,
    onCopy,
    onCut,
    onInput,
    onPaste,
    onSelect,
    wrap,
    ...rest
  } = props;

  const fieldId = useAmplifyFieldID(id);

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
      <Label
        htmlFor={fieldId}
        className={classNames({ 'sr-only': labelHidden })}
      >
        {label}
      </Label>
      {!labelHidden && descriptiveText ? (
        <Text className={ComponentClassNames.FieldDescription}>
          {descriptiveText}
        </Text>
      ) : null}
      <Flex className={ComponentClassNames.FieldWrapper}>
        <Input
          aria-labeledby={fieldId}
          className={ComponentClassNames.TextFieldInput}
          defaultValue={defaultValue}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          size={size}
          type={type}
          value={value}
          onChange={onChange}
          onCopy={onCopy}
          onCut={onCut}
          onInput={onInput}
          onPaste={onPaste}
          onSelect={onSelect}
          {...rest}
        />
      </Flex>
      {hasError && errorMessage ? (
        <Text className={ComponentClassNames.FieldErrorMessage}>
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
};
