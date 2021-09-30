import classNames from 'classnames';
import React, { useMemo } from 'react';

import { RadioGroupContext, RadioGroupContextType } from './context';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { RadioGroupFieldProps } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { useAmplifyID } from '../shared/utils';

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
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
  isRequired,
  isReadOnly,
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
  const fieldId = useAmplifyID(id);
  const radioGroupContextValue: RadioGroupContextType = useMemo(
    () => ({
      currentValue: value,
      defaultValue,
      hasError,
      isRequired,
      isReadOnly,
      isGroupDisabled: isDisabled,
      onChange,
      size,
      name,
    }),
    [
      defaultValue,
      hasError,
      isDisabled,
      isRequired,
      isReadOnly,
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
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.RadioGroupField,
        className
      )}
      data-size={size}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
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
      <Flex
        aria-labelledby={fieldId}
        className={ComponentClassNames.RadioGroup}
        role="radiogroup"
      >
        <RadioGroupContext.Provider value={radioGroupContextValue}>
          {children}
        </RadioGroupContext.Provider>
      </Flex>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};
