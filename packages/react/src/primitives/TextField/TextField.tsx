import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { useAmplifyID } from '../shared/utils';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { FieldGroup } from '../FieldGroup';
import { Input } from '../Input';
import { Label } from '../Label';
import { TextFieldProps } from '../types';

export const TextField: React.FC<TextFieldProps> = ({
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
  outerEndComponent,
  outerStartComponent,
  innerStartComponent,
  innerEndComponent,
  onChange,
  onCopy,
  onCut,
  onInput,
  onPaste,
  onSelect,
  onSubmit,
  size,
  testId,
  type = 'text',
  value,
  wrap,
  ...rest
}) => {
  const fieldId = useAmplifyID(id);

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.TextField,
        className
      )}
      data-size={size}
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
      <FieldGroup
        outerStartComponent={outerStartComponent}
        outerEndComponent={outerEndComponent}
        innerStartComponent={innerStartComponent}
        innerEndComponent={innerEndComponent}
      >
        <Input
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          onChange={onChange}
          onCopy={onCopy}
          onCut={onCut}
          onInput={onInput}
          onPaste={onPaste}
          onSelect={onSelect}
          onSubmit={onSubmit}
          size={size}
          type={type}
          value={value}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
