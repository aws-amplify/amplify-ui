import classNames from 'classnames';
import React, { useMemo } from 'react';

import { RadioGroupContext, RadioGroupContextType } from './context';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { RadioGroupProps } from '../types';
import { ComponentClassNames, useAmplifyFieldID } from '../shared';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  alignContent,
  alignItems,
  children,
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
  name,
  size,
  value,
  wrap,
  ...rest
}) => {
  const fieldId = useAmplifyFieldID(id);
  const radioGroupContextValue: RadioGroupContextType = useMemo(
    () => ({
      currentValue: value,
      defaultValue,
      hasError,
      isReadOnly,
      isRequired,
      isGroupDisabled: isDisabled,
      onChange,
      size,
      name,
    }),
    [
      defaultValue,
      hasError,
      isDisabled,
      isReadOnly,
      isRequired,
      onChange,
      size,
      name,
      value,
    ]
  );
  return (
    <Flex
      alignContent={alignContent}
      alignItems={alignItems}
      aria-labelledby={fieldId}
      className={classNames(ComponentClassNames.RadioGroup, className)}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      role="radiogroup"
      wrap={wrap}
      {...rest}
    >
      <Label id={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <RadioGroupContext.Provider value={radioGroupContextValue}>
        {children}
      </RadioGroupContext.Provider>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
