import classNames from 'classnames';
import React from 'react';

import { Checkbox } from '../Checkbox';
import { FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { CheckboxFieldProps } from '../types/checkboxField';
import { ComponentClassNames } from '../shared';
import { useTestId } from '../Checkbox/useTestId';

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  alignContent,
  alignItems,
  checked,
  children,
  className,
  defaultChecked,
  direction,
  errorMessage,
  gap,
  hasError = false,
  id,
  isDisabled,
  isReadOnly,
  isRequired,
  justifyContent,
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
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.CheckboxField,
        className
      )}
      data-size={size}
      testId={testId}
    >
      <Checkbox
        alignContent={alignContent}
        alignItems={alignItems}
        checked={checked}
        defaultChecked={defaultChecked}
        direction={direction}
        gap={gap}
        hasError={hasError}
        id={id}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        justifyContent={justifyContent}
        name={name}
        onChange={onChange}
        testId={useTestId(testId, ComponentClassNames.Checkbox)}
        size={size}
        value={value}
        wrap={wrap}
        {...rest}
      >
        {children}
      </Checkbox>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
