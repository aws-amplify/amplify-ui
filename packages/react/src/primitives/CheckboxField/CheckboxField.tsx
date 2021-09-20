import classNames from 'classnames';
import React from 'react';

import { Checkbox } from '../Checkbox';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { CheckboxFieldProps } from '../types/checkboxField';
import { ComponentClassNames } from '../shared';

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  alignContent,
  alignItems,
  checked,
  children,
  className,
  defaultChecked,
  descriptiveText,
  direction = 'column',
  errorMessage,
  gap,
  hasError = false,
  id,
  isEmphasized,
  isDisabled,
  isReadOnly,
  isRequired,
  justifyContent,
  label,
  labelHidden = false,
  name,
  onChange,
  testId,
  size,
  value,
  wrap,
  ...rest
}) => {
  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.CheckboxField,
        className
      )}
      data-size={size}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      testId={testId}
      wrap={wrap}
      {...rest}
    >
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        hasError={hasError}
        id={id}
        isEmphasized={isEmphasized}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        name={name}
        onChange={onChange}
        testId={`${testId}-checkbox`}
        size={size}
        value={value}
      >
        {children}
      </Checkbox>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
