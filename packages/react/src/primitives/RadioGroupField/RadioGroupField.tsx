import classNames from 'classnames';
import { useMemo } from 'react';

import { RadioGroupContext, RadioGroupContextType } from './context';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { RadioGroupFieldProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { useStableId } from '../shared/utils';

export const RadioGroupField: Primitive<RadioGroupFieldProps, 'input'> = ({
  children,
  className,
  defaultValue,
  descriptiveText,
  errorMessage,
  hasError = false,
  id,
  isDisabled,
  isRequired,
  isReadOnly,
  label,
  labelHidden = false,
  onChange,
  name,
  size,
  value,
  ...rest
}) => {
  const fieldId = useStableId(id);
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
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.RadioGroupField,
        className
      )}
      data-size={size}
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
