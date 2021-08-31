import classNames from 'classnames';
import React from 'react';

import { ComponentClassNames, useAmplifyFieldID } from '../shared';
import { FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { Select } from '../Select';
import { Label } from '../Label';
import { SelectFieldProps } from '../types/selectField';

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const {
    alignContent,
    alignItems,
    children,
    className,
    defaultValue,
    direction = 'column',
    errorMessage,
    gap,
    hasError = false,
    icon,
    iconColor,
    id,
    isDisabled,
    isRequired,
    justifyContent,
    label,
    labelHidden = false,
    onChange,
    placeholder,
    size,
    testId,
    value,
    variation,
    wrap,
    ...rest
  } = props;

  const fieldId = useAmplifyFieldID(id);

  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      className={classNames(ComponentClassNames.Field, className)}
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
      <Select
        aria-labelledby={fieldId}
        defaultValue={defaultValue}
        hasError={hasError}
        icon={icon}
        iconColor={iconColor}
        id={fieldId}
        isDisabled={isDisabled}
        isRequired={isRequired}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        variation={variation}
        value={value}
        {...rest}
      >
        {children}
      </Select>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
