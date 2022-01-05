import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldErrorMessage, FieldDescription } from '../Field';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { RadioGroupContext, RadioGroupContextType } from './context';
import { RadioGroupFieldProps, Primitive } from '../types';
import { useStableId } from '../utils/useStableId';

// Note: RadioGroupField doesn't extend the JSX.IntrinsicElements<'input'> types (instead extending 'typeof Flex')
// because all rest props are passed to Flex container
const RadioGroupFieldPrimitive: Primitive<RadioGroupFieldProps, typeof Flex> = (
  {
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
  },
  ref
) => {
  const fieldId = useStableId(id);
  const radioGroupContextValue: RadioGroupContextType = React.useMemo(
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
      ref={ref}
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

export const RadioGroupField = React.forwardRef(RadioGroupFieldPrimitive);

RadioGroupField.displayName = 'RadioGroupField';
