import classNames from 'classnames';
import * as React from 'react';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { ComponentClassNames, useAmplifyFieldID } from '../shared';
import { TextFieldProps } from '../types';
import { Text } from '../Text';
import { Input } from '../Input';
import { FieldDescription, FieldErrorMessage } from '../Field';

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
    onChange,
    onCopy,
    onCut,
    onInput,
    onPaste,
    onSelect,
    size,
    testId,
    type = 'text',
    value,
    wrap,
    ...rest
  } = props;

  const fieldId = useAmplifyFieldID(id);

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(ComponentClassNames.TextField, className)}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      testId={testId}
      wrap={wrap}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <Flex className={ComponentClassNames.FieldWrapper}>
        <Input
          aria-labelledby={fieldId}
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
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
